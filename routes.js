'use strict';

const jwt = require('jsonwebtoken');
const config = require('./config/config.json');
const register = require('./functions/users/register');
const contacts = require('./functions/contacts/register');
const login = require('./functions/users/login');
const User = require('./models/user');

const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://addressbook-15936.firebaseio.com"
});

module.exports = router => {

    router.post('/authenticate', (req, res) => {
        login.loginUser(req.body.email, req.body.password)

            .then(result => {

                const token = jwt.sign(result, config.secret, {
                    expiresIn: '1h'
                });

                User.findOneAndUpdate({
                    email: req.body.email
                }, req.body, function(err, user) {

                    user.token = token;

                    user.save(function(err) {
                        if (err)
                            res.status(400).json({
                                message: 'Invalid Request !'
                            });
                    });
                });

                res.status(result.status).json({
                    message: 'User Authenticated Sucessfully !',
                    token: token
                });

            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    });

    router.post('/users', (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password || !email.trim() || !password.trim()) {

            res.status(400).json({
                message: 'Invalid Request !'
            });

        } else {

            register.registerUser(email, password)

                .then(result => {

                    res.setHeader('Location', '/users/' + email);
                    res.status(result.status).json({
                        message: result.message
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });

    router.post('/contacts', (req, res) => {

        const email = req.body.email;
        const token = req.headers['x-access-token'];

        if (!email || !token || !email.trim()) {

            res.status(400).json({
                message: 'Invalid Request !'
            });

        } else {

            contacts.addContact(email, token, admin)

                .then(result => {

                    res.status(result.status).json({
                        message: result.message
                    });
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));

        }
    });

}
