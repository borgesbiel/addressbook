'use strict';

const user = require('../../models/user');
const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');

exports.addContact = (email, token, admin) =>

    new Promise((resolve, reject) => {

        const db = admin.database();

        user.find({
                token: token
            })

            .then(users => {

                if (users.length == 0) {

                    reject({
                        status: 404,
                        message: 'User Not Found !'
                    });

                } else {

                    return users[0];

                }
            })

            .then(user => {

                if (checkToken(token)) {

                    db.ref("users/" + user.id).child("contacts").push().set({
                        email: email
                    });


                    resolve({
                        status: 201,
                        message: 'Contact Added Sucessfully !'
                    });

                } else {

                    reject({
                        status: 401,
                        message: 'Invalid Token !'
                    });
                }

            })

            .catch(err => reject({
                status: 500,
                message: 'Internal Server Error !'
            }));

    });

function checkToken(token) {

    if (token) {

        try {

            var decoded = jwt.verify(token, config.secret);

            return decoded.status === 200;

        } catch (err) {

            return false;
        }

    } else {

        return false;
    }
}
