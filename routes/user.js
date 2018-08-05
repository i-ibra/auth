const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res) {

    console.log(req.body);

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.json({
            success: false,
            errors: errors
        });
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.json({
                success : false,
                errors: 'Email already exists'
            });
        }else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json({
                                        success: true,
                                        user
                                    });
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    console.log(req.body);

     if(!isValid) {
        return res.json({
            success: false,
            errors: errors
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            
            if(!user) {
                errors.email = 'User not found'
                return res.json({
                    success: false,
                    errors: errors.email
                });
            }

            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }else {
                            errors.password = 'Incorrect Password';
                            return res.json({
                                success: false,
                                errors: errors.password
                            });
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;