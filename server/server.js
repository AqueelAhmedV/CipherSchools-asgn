const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const keys = require('./config/keys')

mongoose.set('strictQuery', true)
mongoose
    .connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/api/users', users)


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`));