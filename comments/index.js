import express from 'express';
import cors from 'cors';
import {v4} from 'uuid';
import axios from 'axios';
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

  axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      postId: req.params.id,
      ...comment
    }
  }).catch(() => {
    console.log('oopsie');
  });

  res.status = 201;
  res.json(comment);
});

app.post('/events', (req, res) => {
  console.log('Received event: %s', req.body);
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
});
