const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
app.init();
app.start();
