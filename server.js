require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//setting up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Middleware - function to excecute for all routes
app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
})
//this allows the body of the POST request - REQUIRED FOR POST REQUEST
app.use(express.urlencoded({extended: false}));
//method override lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride('_method'));

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//routes
app.get('/', (req, res) => {
  res.send('Homepage');
});

//New
app.get('/new', (req, res) => {
  res.render('New');
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`listening at port ${port}`);
})
