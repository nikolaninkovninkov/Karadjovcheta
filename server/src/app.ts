import express, { response } from 'express';
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('WOOO! It works! ');
});
app.listen(port);
