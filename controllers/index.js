var express = require('express');
var router = express.Router();
var RegisterModel = require('../models/Register');
var bcrypt = require('bcryptjs');


//Initial Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RSVP' });
});
//Register Page
router.get('/register', renderRegister);
//Login Page for Returning Users
router.get('/login', renderLogin);
//Home Page
router.get('/home', renderHome);

//Successful/Unsuccessful Login Page
router.post('/login/verify', attemptToLogin);

//Successful Register Page
router.post('/register/verify', attemptToRegister, insertIntoUserAccountsTable);


//Function for RenderHome: Creates session using email field
function renderHome(req, res, next){
  console.log(req.session);
  RegisterModel.where({email: req.session.theResultsFromOurModelInsertion}).fetch().then(
      function(result) {
    console.log(result.attributes);
        res.render('home' , result.attributes);
      })
      .catch(function(error) {
        console.log(error)
      });
}


//Function for renderRegister: Displays Register Form for new users
function renderRegister(req, res, next) {
  res.render('register', {});
}


//Function for renderLogin: Displays Login Form for returning users
function renderLogin(req, res, next) {
  res.render('login', {});
}

//Function insertIntoUserAccountsTable: Inputs name, email, and password into user_accounts table
function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);

  var model = new RegisterModel(req.body).save().then(function(data) {
    res.render('home', data.attributes);
  });
}

//Function attemptToRegister: Creates NEW registerModel and creates email as session identifier
function attemptToRegister(req, res, next) {
  console.log(req.session);
  var password = req.body.password_hash;
  var hashedPassword = createPasswordHash(password);
  var account = new RegisterModel({
    name: req.body.name,
    email: req.body.email,
    password_hash: hashedPassword
  }).save().then(function(result) {
    req.session.theResultsFromOurModelInsertion = result.attributes.email;
    console.log(result.attributes.email);
   res.redirect('/home')
  })
.catch(function(error) {
    console.log(error)
    res.render('registerfail');
  });
}


//Function createPasswordHash:Used to salt password and create hashed password
function createPasswordHash (password) {
  var salt = 10;
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

//Function comparePasswordHashes compares inputted and database pw
function comparePasswordHashes (input, db) {
  return bcrypt.compareSync(input, db);
}

//Function attemptToLogin: Confirms compared passwords and returns results
function attemptToLogin(req, res, next) {
  var password = req.body.password_hash;
  RegisterModel.where('email', req.body.email).fetch().then(
      function(result) {
        var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
        req.session.theResultsFromOurModelInsertion = result.attributes.email;
        if (attempt === true) {
          res.redirect('/home');
        }
        else {
          res.render('loginfail')
        }
        // res.json({'is_logged_in': attempt});
      });
}



module.exports = router;
