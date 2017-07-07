process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');
let supertest = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Contacts', () => {

    describe('/POST', () => {

        /*step('it should create contact', (done) => {

            User.find({
                email: 'test@gmail.com'
            }, function(err, user) {
                token = user[0].token;
                callTest(token);
                done()
            });

            function callTest(token) {
                console.log(token);
                chai.request(app)
                    .post('/api/v1/contacts')
                    .send(params)
                    .set("x-access-token", token)
                    .then(response => {
                        console.log(response.status);
                    });
            }

            let params = {
                email: "testcontact@gmail.com"
            }

        });*/

    });
});
