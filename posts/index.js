import express from 'express';
import cors from 'cors';
import {v4} from 'uuid';
import bodyParser from 'body-parser';

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const post = {};
  const id = v4();
  post.id = id
  post.title = req.body.title;

  posts[id] = post;
  res.status = 201;
  res.json(post);
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
