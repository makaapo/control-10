import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {Comment, News, NewsMutation} from './types';
import commentsDB from './commentsDB';

const filename = './news.json';
let data: News[] = [];

const newsDB = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getNews() {
    return data.map(news => ({
      id: news.id,
      title: news.title,
      image: news.image,
      date: news.date
    }));
  },

  async newsMutation(news: NewsMutation) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();
    const newNews = {...news, id,  date}

    data.push(newNews);
    await this.save();

    return newNews;
  },

  async oneNews(id: string) {

    if (data.length > 0 && id) {
      let news: News | undefined = data.find(news => news.id === id);

      if (news !== undefined) {
        return news;
      } else  {
        return null;
      }
    }
  },

  async deleteNews(id: string) {
    if (data.length > 0 && id) {
      let news = await this.oneNews(id);

      if (news === null) {
        return null;
      }

      if (news) {
        let dataComments: Comment[] = await commentsDB.getComments();
        dataComments = dataComments.filter(comment => comment.news_id !== id);
        await commentsDB.save();

        data = data.filter(news => news.id !== id);
        await this.save();
        return 'News was deleted';
      }
    }
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  },
};

export default newsDB;