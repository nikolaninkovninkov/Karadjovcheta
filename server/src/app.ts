import express, { response } from 'express';
import { connect } from 'mongoose';
import usersRouter from './routes/usersRouter';
import { config } from 'dotenv';
import admin from 'firebase-admin';
import cors from 'cors';
// import { Bot as ViberBot, Events as BotEvents } from 'viber-bot';
config();
const app = express();
const port = process.env.PORT || 5000;
// const bot = new ViberBot({
//   authToken: process.env.VIBER_BOT_KEY,
//   name: 'Karadjovcheta',
//   avatar: './assets/viber-image.jpg',
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
// if (!process.env.FIREBASE_ADMIN_KEY) {
//   throw new Error('Firebase admin key not defined');
// }
// const [projectId, privateKey, clientEmail] =
//   process.env.FIREBASE_ADMIN_KEY.split(';');

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId,
//     clientEmail,
//     privateKey: privateKey.replace(/\\n/g, '\n'),
//   }),
// });
// bot.on(BotEvents.MESSAGE_RECEIVED, (message: any, response: any) => {
//   // Echo's back the message to the client. Your bot logic should sit here.
//   response.send(message);
// });
app.use('/api/users', usersRouter);
// app.use('/viber/webhook', bot.middleware());
app.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
  // bot
  //   .setWebhook('https://node-server-w3aaqft6pq-uc.a.run.app')
  //   .catch((err: any) => console.error(err));
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
