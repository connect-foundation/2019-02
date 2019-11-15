const dotenv = require('dotenv');

dotenv.config();

const App = require('./app');
const db = require('./models');

const app = new App(db);

app.init();
app.start();
