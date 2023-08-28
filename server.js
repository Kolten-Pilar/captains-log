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
  res.send(`<h1>Captain's Logs</h1>
  <h2><a href='/logs'>See All Logs</a></h2>
  <h2><a href='/new'>Create a New Log</a></h2>
  `);
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

//Edit
app.get('/logs/:id/edit', async (req, res) => {
  const foundLog = await Log.findById(req.params.id); //find the log by id
  res.render('Edit', {
    log: foundLog //pass the found logs to the edit page
  });
});

//Update = PUT
app.put('/logs/:id', async (req, res) => {
  req.body.shipIsBroken === 'on' ? req.body.shipIsBroken = true : req.body.shipIsBroken = false;
  await Log.findByIdAndUpdate(req.params.id, req.body); //find the log by id and update it
  res.redirect(`/logs/${req.params.id}`); //redirect to the edited log
});

//Delete
app.delete('/logs/:id', async (req, res) => {
  await Log.findByIdAndRemove(req.params.id); //find the log by id and remove it
  res.redirect('/logs'); //redirect to the index page
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`listening at port ${port}`);
})
