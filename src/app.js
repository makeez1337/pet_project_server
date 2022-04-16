const express = require('express');
const { Sequelize } = require('sequelize');

const { User } = require('./model/User');
const { apiRouter } = require("./routes/apiRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize("owu", "postgres", null, {
    host: "localhost",
    dialect: "postgres"
});

const PORT = 5200;

app.use(apiRouter);

app.listen(PORT, async () => {
    console.log(`Server on ${PORT} has started`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
})
