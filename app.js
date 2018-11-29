import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('IReporter Api')
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});