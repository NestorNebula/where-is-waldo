const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/routes');

const origins = [process.env.ORIGIN1];
app.use(
  cors({
    origin: function (origin, cb) {
      if (origins.indexOf(origin) === -1) {
        return cb(
          new Error("The origin doesn't have access rights to this API.")
        );
      }
      return cb(null, true);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', router.user);
app.use('/photos', router.photo);
app.use('/rounds', router.round);

app.listen(process.env.PORT, () =>
  console.log(`App running on PORT ${process.env.PORT}.`)
);
