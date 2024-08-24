import express  from 'express';
import {Comment, CommentMutation} from '../types';
import commentsDB from "../commentsDB";
import newsDB from "../newsDB";

const commentsRouter = express.Router();

commentsRouter.post('/', async (req, res) => {
  if (!req.body.news_id || !req.body.text) {
    return res.status(404).send({error: "Text and News ID is request"});
  }
  const checkNews = await newsDB.oneNews(req.body.news_id);

  if (!checkNews) {
    return res.status(404).send({error: "News not found"});
  }

  const newComment: CommentMutation = {
    news_id: req.body.news_id,
    author: req.body.author && req.body.author.trim() ? req.body.author : 'Anonymous',
    text: req.body.text,
  };

  const createComment = await commentsDB.commentMutation(newComment);
  return res.send(createComment);
});

commentsRouter.get('/', async (req, res) => {
  let comments: Comment[] = [];

  if (req.query.news_id) {
    let comment = await commentsDB.CommentWithNewsId(String(req.query.news_id));
    if (comment !== null) {
      res.send(comment);
    } else {
      res.status(404).send({error: "Comment not found"});
    }
  } else {
    comments = await commentsDB.getComments();
    res.send(comments);
  }
});


commentsRouter.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({error: "Write the correct ID in the url"});
  }

  let comment = await commentsDB.deleteComment(req.params.id);

  if (comment !== null) {
    res.send(comment);
  } else {
    res.status(404).send({error: "Comment not found"});
  }
});


export default commentsRouter