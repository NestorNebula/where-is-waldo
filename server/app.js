const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', router.user);
app.use('/photos', router.photo);
app.use('/rounds', router.round);

app.listen(process.env.PORT, () =>
  console.log(`App running on PORT ${process.env.PORT}.`)
);
