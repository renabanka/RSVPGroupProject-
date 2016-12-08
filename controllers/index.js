var express = require('express');
var router = express.Router();
var RegisterModel = require('../models/Register');
var EventModel = require('../models/Event');
var EventAttendance = require('../models/EventAttendance');
var bcrypt = require('bcryptjs');
var patch = require('node-patch');

//ALL GET ROUTES

//Initial Page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'RSVP' });
});

//Register Page
router.get('/register', renderRegister);

//Login Page
router.get('/login', renderLogin);

//Home Page
router.get('/home', renderAll, renderAllEventAttendance);

//Event Attendance Page
router.get('/eventattendance', renderAllEventAttendance);

router.get('/myeventattendance2', renderMyEventAttendance);


//Create Event page
router.get('/createevent', function(req, res, next) {
    res.render('createevent', {});
});

//Logout
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});

router.get('/myeventattendance', function (req, res) {
    res.render('myeventattendance2')
});



//ALL Post Routes

//Successful/Unsuccessful Login Page
router.post('/login/verify', attemptToLogin);

//Successful Register Page
router.post('/register/verify', attemptToRegister, insertIntoUserAccountsTable);

//Event created and entered in events table
router.post('/createevent', insertIntoEventsTable);


router.post('/createeventattendance', insertIntoEventsAttendance);



//Function for RenderHome: Creates session using email field
function renderHome(req, res, next){
    console.log(req.session, 'renderHome function')
    RegisterModel.where({email: req.session.email}).fetch().then(
        function(result) {
            console.log(result.attributes);
            res.render('home' , result.attributes);
        })
        .catch(function(error) {
            console.log(error)
        });
}

function renderAll(req, res, next) {
    console.log(req.session);
    EventModel.collection().fetch().then(function(models) {
        var sanitizeModels = sanitizeModelsToJsonArray(models);
        var resJson = {
            events: sanitizeModels,
            name: req.session.name,
            email: req.session.email,
            id: req.session.user_id
        };

        res.render('home', resJson);
    });
};


function renderAllEventAttendance(req, res, next) {
    EventAttendance.collection().fetch().then(function(models) {
        var sanitizeModels = sanitizeModelsToJsonArray(models);
        var resJson = {
            event_attendance: sanitizeModels,
            email: req.session.email,
            id: req.session.user_id,
            name: req.session.name,

        };
        console.log(resJson);
        res.render('eventattendance', resJson);
//         try {
//     eventAttendence.user_id = req.session.user_id;
//     eventAttendence.name = req.session.name;
// } catch (error) {
//     console.log('insertIntoEventsAttendance Error:');
//     console.log(error);
//     eventAttendence.user_id = '1';
// }
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
    var eventAttendence = req.body;

    var event = new EventModel(req.body).save().then(function(data) {
        res.render('userprofile', data.attributes);
    });
}

//function insertIntoEventsAttendance: inputs user status into eventsAttendance
function insertIntoEventsAttendance(req, res, next) {
    console.log(req.body);
    console.log(req.session);
    var eventAttendence = req.body;
    eventAttendence.user_id = req.session.user_id;
    eventAttendence.name = req.session.name;


    var attendance = new EventAttendance(eventAttendence).save().then(function(data) {
        res.redirect('home');
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
        req.session.name = result.attributes.name;
        req.session.email = result.attributes.email;
        req.session.user_id = result.attributes.id;
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
    console.log(password, req.body);
    RegisterModel.where({email: req.body.email}).fetch().then(
        function (result) {
            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
            req.session.name = result.attributes.name;
            req.session.email = result.attributes.email;
            req.session.user_id = result.attributes.id;
            console.log(attempt);
            if (attempt === true) {
                res.redirect('/home');

            }
            else if (attempt === false) {
                res.render('loginfail')

            }

            else {
                res.render('loginfail')
                console.log(attempt)
            }
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

function renderMyEventAttendance(req, res, next) {
    console.log(req.session);
    RegisterModel.where({id: req.session.user_id}).fetch({withRelated: ['eventattendances']})
        .then(function(user) {
            console.log(user, 'HERE!!');

            EventModel.where({id: user.related('eventattendances').models[0].attributes.evt_id}).fetch()
                .then(function(event){
                    console.log(event);
                    res.json(user.related('eventattendances'))
                })
        })

};




module.exports = router;
