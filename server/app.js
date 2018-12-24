import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import fileupload from 'express-fileupload';
import routes from './routes/routes';
import auth from './routes/auth.routes';

const app = express();

app.use(cors({
  credentials: true,
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
}));


// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload());

app.get('/', (req, res) => {
  res.status(200).json({ welcome: 'IReporter Api' });
});


app.use('/api/v1/auth', auth);
app.use('/api/v1', routes);

app.get('/images/:name', (req, res) => {
  fs.readFile(`server/uploads/images/${req.params.name}`, (err, data) => {
    res.status(200).send(data);
  });
});

app.get('/videos/:name', (req, res) => {
  fs.readFile(`server/uploads/videos/${req.params.name}`, (err, data) => {
    res.status(200).send(data);
  });
});


app.use((req, res) => {
  res.status(404).json({ error: 'check documentation on routes' });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
