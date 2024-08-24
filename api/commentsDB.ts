import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Comment, CommentMutation} from './types';

const filename = './comments.json';
let data: Comment[] = [];

const commentsDB = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getComments() {
    return data;
  },

  async commentMutation(news: CommentMutation) {
    const id = crypto.randomUUID();
    const newComment = {...news, id};

    data.push(newComment);
    await this.save();

    return newComment;
  },

  async oneComment(id: string) {

    if (data.length > 0 && id) {
      let comment: Comment | undefined = data.find(comments => comments.id === id);

      if (comment !== undefined) {
        return comment;
      } else {
        return null;
      }
    }
  },
  async CommentWithNewsId(id: string) {

    if (data.length > 0 && id) {
      let comments: Comment[] = [];

      data.forEach(comment => {
        if (comment.news_id === id) {
          comments.push(comment);
        }
      });

      return comments.reverse();
    }
  },


  async deleteComment(id: string) {
    if (data.length > 0 && id) {
      let comment = await this.oneComment(id);

      if (comment === null) {
        return null;
      }

      if (comment) {
        data = data.filter(comment => comment.id !== id);
        await this.save(data);
        return 'Comment deleted';
      }
    }
  },
  async save(dataUpdate?: Comment[]) {
    if (dataUpdate === undefined) dataUpdate = data;
    return fs.writeFile(filename, JSON.stringify(dataUpdate, null, 2));
  },
};

export default commentsDB;