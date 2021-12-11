import express, { response } from 'express';
import { connect } from 'mongoose';
import usersRouter from './routes/usersRouter';
import { config } from 'dotenv';
import cors from 'cors';
import newsRouter from './routes/newsRouter';
config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port);

  if (process.env.DB_URI)
    connect(process.env.DB_URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }).then(() => {
      console.log('Database connection established');
    });
  else throw new Error('Database uri not valid');
});
