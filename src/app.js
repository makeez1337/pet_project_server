const express = require('express');
const cors = require('cors')
const { Sequelize } = require('sequelize');
require('dotenv').config();

const { User } = require('./model/User');
const { apiRouter } = require('./routes/apiRouter');
const { sequelize } = require('./db/instanse');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(apiRouter);

app.listen(PORT, async () => {
  console.log(`Server on PORT ${PORT} has started`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }
});
