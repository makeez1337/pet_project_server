require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { appConfig } = require('./config');
const { apiRouter } = require('./routes/apiRouter');
const { sequelize } = require('./db/instanse');

const app = express();

app.use(express.json());
app.use('/phoneImg', express.static('src/static/uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
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
