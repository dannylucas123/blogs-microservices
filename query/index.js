import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const posts = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts', (req, res) => {
  res.status = 200;
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: []}
  }

  if (type === 'CommentCreated') {
    const { postId, ...rest } = data;
    if (posts[postId]) {
      posts[postId].comments.push(rest); 
    }
  }

  if (type === 'CommentUpdated') {
    const { postId } = data;
    if (posts[postId]) {
      const r = posts[postId].comments;
      r.splice(r.findIndex(b => b.id === data.id), 1, data);
    }
  }

  res.status = 201;
  res.send({})
});

app.listen(4002, () => {
  console.log('Listening on port 4002');
});
