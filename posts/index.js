import express from 'express';
import cors from 'cors';
import {v4} from 'uuid';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', (req, res) => {
  const post = {};
  const id = v4();
  post.id = id
  post.title = req.body.title;

  posts[id] = post;

  axios.post('http://event-bus-srv:4005/events', {type: 'PostCreated', data: {...post}}).catch(console.log)
  res.status = 201;
  res.json(post);
});

app.post('/events', (req, res) => {
  console.log('Received event: %s', req.body);
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
