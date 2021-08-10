import express from 'express';
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  console.log('hello world!');
});
app.listen(port);
