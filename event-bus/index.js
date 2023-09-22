import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

const events = [];

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event).catch(() => console.log(''));
  axios.post('http://localhost:4001/events', event).catch(() => console.log(''));
  axios.post('http://localhost:4002/events', event).catch(() => console.log(''));
  axios.post('http://localhost:4003/events', event).catch(() => console.log(''));

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
