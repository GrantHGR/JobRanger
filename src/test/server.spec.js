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
        .send({username: 'test123', password: 'test234'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    })
  it('Negative : /register. Checking invalid name', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: '', password: ''})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('login!', () => {
  it('positive : /login', done => {
      chai
        .request(server)
        .post('/login')
        .send({username: 'test123', password: 'test234'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    })
  it('Negative : /login. Checking invalid name', done => {
    chai
      .request(server)
      .post('/login')
      .send({id: '5', username: '', password: ''})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Add General', () => {
  it('positive : /info/addGeneral', done => {
    chai
      .request(server)
      .post('/info/addGeneral')
      .send({username: 'test123', firstname: 'Bob', lastname: 'Smith', dob: '1995-02-02', email: '123@gmail.com', linkedin: 'bSmith@linkedin.com', github: 'bsmith@github.com'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addGeneral. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addGeneral')
      .send({username: 'test123', firstname: 6, lastname: 'Smith', dob: 45, email: '123@gmail.com', linkedin: 'bSmith@linkedin.com', github: 'bsmith@github.com'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update General', () => {
  it('positive : /info/updateGeneral', done => {
    chai
      .request(server)
      .post('/info/updateGeneral')
      .send({username: 'test123', firstname: 'Bob', lastname: 'Smith', dob: '1995-02-02', email: 'bobbyBoiFre$$$h@gmail.com', linkedin: 'bSmith@linkedin.com', github: 'bsmith@github.com'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateGeneral. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateGeneral')
      .send({username: 'test123', firstname: 1, lastname: 'Smith', dob: 1, email: '123@gmail.com', linkedin: 'bSmith@linkedin.com', github: 'bsmith@github.com'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Add Education', () => {
  it('positive : /info/addEducation', done => {
    chai
      .request(server)
      .post('/info/addEducation')
      .send({username: 'test123', school: 'East High School', degree: 'GED', focus: 'Keepin it real', startdate: '2007-12-12', enddate: '2011-05-05', description: 'You know what it is'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addEducation. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addEducation')
      .send({username: 'test123', school: 'East High School', degree: 55, focus: 'Keepin it real', startdate: '2007-32-32', enddate: '2011-05-05', description: 'You know what it is'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update Education', () => {
  it('positive : /info/updateEducation', done => {
    chai
      .request(server)
      .post('/info/updateEducation')
      .send({username: 'test123', school: 'West High School', degree: 'GED', focus: 'Keepin it real', startdate: '2007-12-12', enddate: '2011-05-05', description: 'You know what it is'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateEducation. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateEducation')
      .send({username: 'test123', school: 'East High School', degree: 55, focus: 'Keepin it real', startdate: '2007-32-32', enddate: '2011-05-05', description: 'You know what it is'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Add Experience', () => {
  it('positive : /info/addExperience', done => {
    chai
      .request(server)
      .post('/info/addExperience')
      .send({username: 'test123', organization: 'The Haus', title: 'Boss', startdate: '2011-11-11', enddate: '2014-11-11', description: 'Hahahahaha'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addExperience. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addExperience')
      .send({username: 'test123', organization: 555, title: 'Boss', startdate: '2011-11-11', enddate: '2014-11-11', description: 'Hahahahaha'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update Experience', () => {
  it('positive : /info/updateExperience', done => {
    chai
      .request(server)
      .post('/info/updateExperience')
      .send({username: 'test123', organization: 'The House', title: 'Peasant', startdate: '2011-11-11', enddate: '2014-11-11', description: 'Hahahahaha'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateExperience. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateExperience')
      .send({username: 'test123', organization: 444, title: 'Boss', startdate: '2011-11-11', enddate: '2014-11-11', description: 'Hahahahaha'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Add Skill', () => {
  it('positive : /info/addSkill', done => {
    chai
      .request(server)
      .post('/info/addSkill')
      .send({username: 'test123', skill: 'Hustle Pool'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addSkill. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addSkill')
      .send({username: '1', skill: 55})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update Skill', () => {
  it('positive : /info/updateSkill', done => {
    chai
      .request(server)
      .post('/info/updateSkill')
      .send({username: 'test123', skill: 'Play Pool'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateSkill. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateSkill')
      .send({username: 'test123', skill: 44})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Add language', () => {
  it('positive : /info/addLanguage', done => {
    chai
      .request(server)
      .post('/info/addLanguage')
      .send({username: 'test123', language: 'Italian', proficiency: 'Fluent'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addLanguage. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addLanguage')
      .send({username: 'test123', language: 14, proficiency: 'Fluent'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update language', () => {
  it('positive : /info/updateLanguage', done => {
    chai
      .request(server)
      .post('/info/updateLanguage')
      .send({username: 'test123', language: 'Italian', proficiency: 'Begginer'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateLanguage. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateLanguage')
      .send({username: 'test123', language: 12, proficiency: 'Fluent'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Add Location', () => {
  it('positive : /info/addLocation', done => {
    chai
      .request(server)
      .post('/info/addLocation')
      .send({username: 'test123', country: 'United States', city: 'Miami'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/addLocation. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/addLocation')
      .send({username: 'test123', country: 14, city: 'Miami'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 

describe('Update Location', () => {
  it('positive : /info/updateLocation', done => {
    chai
      .request(server)
      .post('/info/updateLocation')
      .send({username: 'test123', country: 'United States', city: 'New York'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })
  it('Negative : /info/updateLocation. Checking invalid input', done => {
    chai
      .request(server)
      .post('/info/updateLocation')
      .send({username: 'test123', country: 14, city: 'Miami'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
}); 