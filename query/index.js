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
    const { id, content, postId } = data;
    if (posts[postId]) {
      posts[postId].comments.push({id, content}); 
    }
  }

  console.log(posts);

  res.status = 201;
  res.send({})
});

app.listen(4002, () => {
  console.log('Listening on port 4002');
});
