require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Log = require('./models/logs.js'); //import the model
const methodOverride = require('method-override');

Log.once('open', () => {
  console.log('connected to the Logs database');
})


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

//index
app.get('/logs', async (req, res) => {
  const foundLogs = await Log.find({}); //find all the logs
  res.render('Index',  {
    logs: foundLogs //pass the found logs to the index page
  })
});

//Show
app.get('/logs/:id', async (req, res) => {
  const allLogs = await Log.findById(req.params.id); //find the log by id
  res.render('Show', {
    log: allLogs //pass the found logs to the show page
  });
});

//New
app.get('/new', (req, res) => {
  res.render('New');
});

//Create = POST
app.post('/logs', async (req, res) => {
  console.log('created log: ', req.body);
   //verify if the checkbox is checked or not
   req.body.shipIsBroken === 'on' ? req.body.shipIsBroken = true : req.body.shipIsBroken = false;
  await Log.create(req.body); //create the new log
  res.redirect('/logs'); //redirect to the index page
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`listening at port ${port}`);
})
