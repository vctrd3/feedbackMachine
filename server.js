const express = require('express');
const mongoose = require('mongoose');
require('./models/User'); //needs to be before passport initialization
require('./models/Survey');
require('./services/passport'); //initialize passport
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes')
const surveyRoutes = require('./routes/surveyRoutes')
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
})
);

//tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', billingRoutes);
app.use('/', surveyRoutes);

if(process.env.NODE_ENV === 'production'){
  //Express will serve production asset
  app.use(express.static('client/build'));
  //Express will serve index.html if it doesnt recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server listening on port ${PORT}`));