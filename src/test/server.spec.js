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
        .send({id: '5', username: 'JohnDoe123', password: 'p00py'})
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
      .send({id: '5', username: 10, password: 10})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
});

describe('Add Skill', () => {
  it('positive : /addSkill', done => {
    chai
      .request(server)
      .post('/addSkill')
      .send({id: '1', skill: 'Hustle Pool'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  })
  it('Negative : /addSkill. Checking invalid input', done => {
    chai
      .request(server)
      .post('/addSkill')
      .send({id: '1', skill: 55})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
}); 