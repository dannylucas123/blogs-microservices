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

app.post('/events', async (req, res) => {
  const {data, type} = req.body;

  if (type === 'CommentModerated') {
    comments[data.postId].splice(comments[data.postId].findIndex(e => e.id === data.id), 1, data);

    await axios.post('http://localhost:4005/events', {type: 'CommentUpdated', data});
  }

  res.send({});
})

app.post('/posts/:id/comments', async (req, res) => {
  const ref = comments[req.params.id] || [];
  const comment = {id: v4(), content: req.body.content, status: 'pending'};

  ref.push(comment);
  comments[req.params.id] = ref;

  await axios.post('http://localhost:4005/events', {
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
