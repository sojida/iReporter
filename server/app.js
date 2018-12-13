import 'babel-polyfill';
import express from 'express';
import routes from './routes/routes';
import auth from './routes/auth.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ welcome: 'IReporter Api' });
});

app.use('/api/v1/auth', auth);
app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'check documentation on routes' });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
