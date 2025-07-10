const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', function(req, res) {
    res.render('form', {title: 'Registration Form'});
});

router.post('/', 
    [
        check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
        check('email').isEmail().withMessage('Please enter a valid email address'),
    ]
    ,
    function(req, res) {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
            .then(() => {
                res.send('Thank you for your registration!');
            })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
        } else {
            res.send('Thank you for your registration!');
        }
});

router.get('/registrations', basic.check((req, res) => {
    Registration.find()
    .then((registrations) => {
        res.render('index', {title: 'Listing Registrations', registrations});
    })
    .catch(() => {
        res.send('Sorry! Something went wrong.');
    });
}));

module.exports = router; 