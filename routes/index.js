const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


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
            res.render('form', {title: 'Registration Form', name: req.body.name, email: req.body.email, errors: errors.array(), data: req.body});
        } else {
            res.send('Thank you for your registration!');
        }
});

module.exports = router; 