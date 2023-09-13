import express from 'express';
import cors from 'cors';
import {v4} from 'uuid';
import bodyParser from 'body-parser';

const app = express();

const comments = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id]);
});

app.post('/posts/:id/comments', (req, res) => {
  const ref = comments[req.params.id] || [];
  const comment = {id: v4(), content: req.body.content};

  ref.push(comment);
  comments[req.params.id] = ref;

  res.status = 201;
  res.json(comment);
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
});
