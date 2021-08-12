import express, { response } from 'express';
import { connect } from 'mongoose';
import usersRouter from './routes/usersRouter';
import { config } from 'dotenv';
import admin from 'firebase-admin';
config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (!process.env.FIREBASE_ADMIN_KEY) {
  throw new Error('Firebase admin key not defined');
}
const [projectId, privateKey, clientEmail] =
  process.env.FIREBASE_ADMIN_KEY.split(';');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'),
  }),
});
app.use('/users', usersRouter);
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
  if (process.env.DB_URI)
    connect(process.env.DB_URI, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }).then(() => {
      console.log('Database connection established');
    });
  else throw new Error('Database uri not valid');
});
