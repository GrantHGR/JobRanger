const server = require('../index');
// Importing libraries

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Register!', () => {
  it('positive : /register', done => {
      chai
        .request(server)
        .post('/register')
        .send({id: 5, username: 'test123', password: 'test234'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals('Success');
          done();
        });
    })
  it('Negative : /register. Checking invalid name', done => {
    chai
      .request(server)
      .post('/register')
      .send({id: '5', username: '', dob: ''})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
});

describe('login!', () => {
  it('positive : /login', done => {
      chai
        .request(server)
        .post('/login')
        .send({id: 5, username: 'test123', password: 'test234'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals('Success');
          done();
        });
    })
  it('Negative : /login. Checking invalid name', done => {
    chai
      .request(server)
      .post('/login')
      .send({id: '5', username: '', dob: ''})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
});