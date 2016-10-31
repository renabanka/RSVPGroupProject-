var express = require('express');
var router = express.Router();
var RegisterModel = require('../models/Register');
var EventModel = require('../models/Event');
var bcrypt = require('bcryptjs');
var patch = require('node-patch');


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
router.get('/all', renderAll);

router.get('/logout', function (req, res) {
  req.session = null;
  res.send([
    'You are now logged out.',
    '&lt;br/>',
    res.redirect('/')
  ].join(''));
});

// router.get('/home', renderAll);
router.get('/createevent', function(req, res, next) {
    res.render('createevent', {});
});


//Successful/Unsuccessful Login Page
router.post('/login/verify', attemptToLogin);

//Successful Register Page
router.post('/register/verify', attemptToRegister, insertIntoUserAccountsTable);

//Event created and entered in events table
router.post('/createevent', insertIntoEventsTable);




// router.patch('', function (req, res) {
//     var updateObject = req.body; // {last_name : "smith", age: 44}
//     var id = req.params.id;
//     db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
// });



//Function for RenderHome: Creates session using email field
function renderHome(req, res, next){

  RegisterModel.where({email: req.session.theResultsFromOurModelInsertion}).fetch().then(
      function(result) {
    console.log(result.attributes);
        res.render('home' , result.attributes);
      })
      .catch(function(error) {
        console.log(error)
      });
}

function renderAll(req, res, next) {
    EventModel.collection().fetch().then(function(models) {
        var sanitizeModels = sanitizeModelsToJsonArray(models);
        var resJson = {
            events: sanitizeModels
        };
        res.render('home', resJson);
    });
};


//Function for renderRegister: Displays Register Form for new users
function renderRegister(req, res, next) {
  res.render('register', {});
}


//Function for renderLogin: Displays Login Form for returning users
function renderLogin(req, res, next) {
  console.log(req.session)
  res.render('login', {});
}

//Function insertIntoUserAccountsTable: Inputs name, email, and password into user_accounts table
function insertIntoUserAccountsTable(req, res, next) {
  console.log(req.body);

  var model = new RegisterModel(req.body).save().then(function(data) {
    res.render('home', data.attributes);
  });
}

//function insertIntoEventsTable: inputs event details into our events table
  function insertIntoEventsTable(req, res, next) {
    console.log(req.body);

  var event = new EventModel(req.body).save().then(function(data) {
    res.render('userprofile', data.attributes);
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
    console.log(password, req.body)
    RegisterModel.where({email: req.body.email}).fetch().then(
      function (result) {
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


function sanitizeModelsToJsonArray(dbModels) {
  var ret = [];
  var models = dbModels.models;
  for (var item in models) {
    var row = models[item];
    var attrs = row.attributes;
    ret.push(attrs);
  }
  return ret;
};




module.exports = router;



