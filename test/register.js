process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {

    describe('/POST', () => {

        step('it should not create a user without password', () => {
            let params = {
                email: "test@gmail.com",
                password: "",
            }
            chai.request(app)
                .post('/api/v1/users')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('Invalid Request !');
                });
        });

        step('it should create a user', () => {
            let params = {
                email: "test@gmail.com",
                password: "abc123",
            }
            chai.request(app)
                .post('/api/v1/users')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('message').eql('User Registered Sucessfully !');
                });
        });

    });

});
