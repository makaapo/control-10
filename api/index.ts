import express from 'express';
import cors from 'cors';
import config from './config';
import newsRouter from './Routers/news';
import commentsRouter from './Routers/comments';
import newsDB from './newsDB';
import commentsDB from './commentsDB';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);
const run = async () => {
  await newsDB.init();
  await commentsDB.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.error);