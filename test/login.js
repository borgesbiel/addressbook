process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Authenticate', () => {

    describe('/POST', () => {

        step('it should not find user to authenticate', () => {
            let params = {
                email: "test@gmail.com",
                password: "abc123",
            }

            chai.request(app)
                .post('/api/v1/authenticate')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('User Not Found !');
                });
        });

        step('it should authenticate user', () => {
            let params = {
                email: "test@gmail.com",
                password: "abc123",
            }

            chai.request(app)
                .post('/api/v1/authenticate')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('message').eql('User Authenticated Sucessfully !');
                });
        });

    });
});
