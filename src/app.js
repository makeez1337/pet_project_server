require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { appConfig } = require('./config');
const { apiRouter } = require('./routes/apiRouter');
const { constants } = require('./constants');
const { sequelize } = require('./db');

const app = express();

app.use(express.json());
app.use(constants.staticPrefix, express.static(constants.staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: constants.origin,
  }),
);
app.use(apiRouter);

app.listen(appConfig.PORT, async () => {
  console.log(`Server on PORT ${appConfig.PORT} has started`);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }
});
