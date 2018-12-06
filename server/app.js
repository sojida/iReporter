import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ welcome: 'IReporter Api' });
});

app.use('/api/v1', routes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
