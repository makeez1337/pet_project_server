const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const { Basket, Token, User, BasketDevice, Brand, Phone } = require('./models');
const { apiRouter } = require('./routes/apiRouter');
const { sequelize } = require('./db/instanse');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use('/phoneImg',express.static('src/static/uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.use(apiRouter);

app.listen(PORT, async () => {
  console.log(`Server on PORT ${PORT} has started`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }
});
