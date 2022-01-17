require('dotenv').config({ path: "./.env" })

const express = require('express');
const router = require('./src/routes');


const log4js = require('log4js');
log4js.configure("./src/config/log4js.json");
const logger = log4js.getLogger();
const { SERVER_PORT } = process.env;

const app = express();

app.use('/', router)

const PORT = SERVER_PORT || 6060;
app.listen(PORT, () => {
    logger.info(`Server is running on port http://localhost:${PORT}`);
});