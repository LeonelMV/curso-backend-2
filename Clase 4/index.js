const express = require('express');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();

app.use(express.json());

dotenv.config();

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`Hamster rolling on port ${process.env.PORT}`);
});