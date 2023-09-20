import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch(() => console.log('oopsie 1'));
  axios.post('http://localhost:4001/events', event).catch(() => console.log('oopsie 2'));
  axios.post('http://localhost:4002/events', event).catch(() => console.log('oopsie 3'));

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
