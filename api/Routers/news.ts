import express  from 'express';
import newsDB from "../newsDB";
import {imagesUpload} from "../multer";
import {NewsMutation} from '../types';

const newsRouter = express.Router();

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.text) {
    res.status(404).send({"error": "Title and text is request"});
  }

  let newNews: NewsMutation = {
    title: req.body.title,
    text: req.body.text,
    image: req.file ? req.file.filename : null,
  };

  newNews = await newsDB.newsMutation(newNews);
  res.send(newNews);
});

newsRouter.get('/', async (req, res) => {
  let news = await newsDB.getNews();
  news = news.reverse();

  res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({error: "Write the correct ID in the url"});
  }

  let news = await newsDB.oneNews(req.params.id);

  if (news === undefined || news === null) {
    res.status(404).send({error: "News not found"});
  }

  if (news !== null) {
    res.send(news);
  }
});

newsRouter.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({error: "Write the correct ID in the url"});
  }

  let news = await newsDB.deleteNews(req.params.id);

  if (news !== null) {
    res.send(news);
  } else {
    res.status(404).send({error: "News not found"});
  }

});


export default newsRouter