const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const routes = require('./routes');

const { testCron } = require('./crons');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/index.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use(express.json());

dotenv.config();

app.use('/api', routes);

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, (error, result) => {
    if(error){
        return console.log(`Error al conectar a la base de datos ${error}`);
    }
    console.log("Conexion a la base de datos establecida.");
    app.listen(process.env.PORT, () => {
        console.log(`Hamster rolling on port ${process.env.PORT}`);
        console.log("Inicializando crons");
        testCron.init();
    });
});

