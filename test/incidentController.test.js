/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import db from '../server/db/user.db';
import {
  createUsersTable, createIncidentTable, deleteUser, deleteIncidents,
} from '../server/db/queries';

import {
  goodInterventionInput,
  goodRedFlagInput,
  user,
  badInput,
  badInput2,
  admin,
  goodRedFlagInput2,
} from './mockData';


chai.use(chaiHttp);

let token;
let userId;
let redFlagId;
let redFlagId2;
let interventionId;
let adminToken;
let adminId;


describe('ALLTEST', () => {
  before(async () => {
    try {
      await db.query(createUsersTable());
      await db.query(createIncidentTable());
      
      console.log('created tables');
    } catch (error) {
      console.log(error);
    }
  });


  after(async () => {
    try {
      await db.query(deleteUser(userId));
      await db.query(deleteUser(adminId));
      await db.query(deleteIncidents(redFlagId));
      await db.query(deleteIncidents(redFlagId2));
      await db.query(deleteIncidents(interventionId));
    } catch (error) {
      console.log(error);
    }
  });

  describe('HOMEPAGE', () => {
    it('should respond with 200', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.welcome).to.be.equal('IReporter Api');
          done();
        });
    });
  });


  describe('REGISTER ', () => {
    it('should create new user', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);

          const {
            firstname,
            lastname,
            othernames,
            email,
            phonenumber,
            username,
            isadmin,
          } = res.body.data[0].user;

          expect(firstname).to.equal(user.firstname);
          expect(lastname).to.equal(user.lastname);
          expect(othernames).to.equal(user.othernames);
          expect(email).to.equal(user.email);
          expect(phonenumber).to.equal(user.phoneNumber);
          expect(username).to.equal(user.username);
          expect(isadmin).to.equal(false);
          done();
        });
    });

    it('should create new admin', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(admin)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);

          adminId = res.body.data[0].user.id;
          adminToken = res.body.data[0].token;
          const {
            firstname,
            lastname,
            othernames,
            email,
            phonenumber,
            username,
            isadmin,
          } = res.body.data[0].user;

          expect(firstname).to.equal(admin.firstname);
          expect(lastname).to.equal(admin.lastname);
          expect(othernames).to.equal(admin.othernames);
          expect(email).to.equal(admin.email);
          expect(phonenumber).to.equal(admin.phoneNumber);
          expect(username).to.equal(admin.username);
          expect(isadmin).to.equal(true);
          done();
        });
    });
  });


  describe('LOGIN ', () => {
    it('should login user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          email: 'soji@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);
          token = res.body.data[0].token;
          userId = res.body.data[0].user.id;

          const {
            firstname,
            lastname,
            othernames,
            email,
            phonenumber,
            username,
          } = res.body.data[0].user;

          expect(firstname).to.equal(user.firstname);
          expect(lastname).to.equal(user.lastname);
          expect(othernames).to.equal(user.othernames);
          expect(email).to.equal(user.email);
          expect(phonenumber).to.equal(user.phoneNumber);
          expect(username).to.equal(user.username);
          done();
        });
    });
  });

  describe('POST ', () => {
    it('should create a new red-flag record', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', token)
        .send(goodRedFlagInput)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);

          redFlagId = res.body.record.id;
          const {
            comment, type, location, status,
          } = res.body.record;

          expect(comment).to.equal(goodRedFlagInput.comment);
          expect(type).to.equal(goodRedFlagInput.type);
          expect(location).to.equal(goodRedFlagInput.location);
          expect(status).to.equal(goodRedFlagInput.status);
          done();
        });
    });

    it('should create a new red-flag record', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', token)
        .send(goodRedFlagInput2)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);

          redFlagId2 = res.body.record.id;
          const {
            comment, type, location, status,
          } = res.body.record;

          expect(comment).to.equal(goodRedFlagInput2.comment);
          expect(type).to.equal(goodRedFlagInput2.type);
          expect(location).to.equal(goodRedFlagInput2.location);
          expect(status).to.equal(goodRedFlagInput2.status);
          done();
        });
    });

    it('should create a new intervention record', (done) => {
      chai.request(server)
        .post('/api/v1/interventions')
        .set('Authorization', token)
        .send(goodInterventionInput)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);

          interventionId = res.body.record.id;
          const {
            comment, type, location, status,
          } = res.body.record;

          expect(comment).to.equal(goodInterventionInput.comment);
          expect(type).to.equal(goodInterventionInput.type);
          expect(location).to.equal(goodInterventionInput.location);
          expect(status).to.equal(goodInterventionInput.status);
          done();
        });
    });

    it('should not create new record because of bad inputs', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', token)
        .send(badInput)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);

          const { errors } = res.body;

          expect(Array.isArray(errors)).to.be(true);
        

          done();
        });
    });

    it('should not create new record because of bad inputs', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', token)
        .send(badInput2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);

          const { errors } = res.body;

          expect(Array.isArray(errors)).to.be(true);

          done();
        });
    });
  });


  describe('GET ALL INCIDENTS', () => {
    it('should respond with all records', (done) => {
      chai.request(server)
        .get('/api/v1/incidents')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;

          expect(Array.isArray(data)).to.be.equal(true);
          expect(res.body.status).to.be.equal(200);
          expect(data[0]).to.contain.keys('id', 'type', 'status');
          done();
        });
    });
  });

  describe('GET RECORDS', () => {
    it('should respond with red-flag records', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;
          const { type } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(type).to.be.equal('red-flag');
          done();
        });
    });

    it('should respond with intervention records', (done) => {
      chai.request(server)
        .get('/api/v1/interventions')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;
          const { type } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(type).to.be.equal('intervention');
          done();
        });
    });
  });


  describe('GET SPECIFIC RECORD', () => {
    it('should respond with specific red-flag record', (done) => {
      chai.request(server)
        .get(`/api/v1/red-flags/${redFlagId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;
          const { type } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(data.length).to.be.equal(1);
          expect(type).to.be.equal('red-flag');
          done();
        });
    });

    it('should respond with specific intervention record', (done) => {
      chai.request(server)
        .get(`/api/v1/interventions/${interventionId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;
          const { type } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(data.length).to.be.equal(1);
          expect(type).to.be.equal('intervention');
          done();
        });
    });

    it('should not return red flag record that is not in database', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/0')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('oops! Nothing found. Check the type of record or the id');
          done();
        });
    });

    it('should not return intervention record that is not in database', (done) => {
      chai.request(server)
        .get('/api/v1/interventions/0')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('oops! Nothing found. Check the type of record or the id');
          done();
        });
    });
  });


  const { location, comment } = {
    location: '10.223432,5.232423',
    comment: 'People are being harassed by police',
  };

  const { badLocation, badComment, noLocation } = {
    badLocation: '11.3454, abxh',
    noLocation: '',
    badComment: '',
  };

  describe('PATCH LOCATION  /api/v1/red-flags/:id/location', () => {
    it('should update specific location', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/location`)
        .set('Authorization', token)
        .send({ location })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);

          const { id } = res.body.data[0];

          expect(id).to.equal(redFlagId);
          expect(res.body.data[0].location).to.equal(location);
          done();
        });
    });


    it('should return with bad request for wrong format', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/location`)
        .set('Authorization', token)
        .send({ location: badLocation })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('location format invalid. Example: (-)90.342345,(-)23.643245.');

          done();
        });
    });

    it('should return with bad request for no location', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/location`)
        .set('Authorization', token)
        .send({ location: noLocation })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('location must be present');

          done();
        });
    });

    it('should have conflict because the status is not draft ', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId2}/location`)
        .set('Authorization', token)
        .send({ location })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('report status is resolved, rejected or under-investigation');
          done();
        });
    });
  });

  describe('PATCH comment /api/v1/red-flags/:id/comment', () => {
    it('should update specific comment', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/comment`)
        .set('Authorization', token)
        .send({ comment })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);

          const { id } = res.body.data[0];

          expect(id).to.equal(redFlagId);
          expect(res.body.data[0].comment).to.equal(comment);
          done();
        });
    });


    it('should return with bad request', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/comment`)
        .set('Authorization', token)
        .send({ badComment })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('Comment must be present');
          done();
        });
    });

    it('should not change comment because it\'s status is not draft', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId2}/comment`)
        .set('Authorization', token)
        .send({ comment })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('report status is resolved, rejected or under-investigation');

          done();
        });
    });
  });

  describe('Admin /api/v1/red-flags/:id/status', () => {
    it('should respond 403 for unautorised user', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${redFlagId}/status`)
        .send({ status: 'resolved' })
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('This user is not an Admin');

          done();
        });
    });

    it('should respond 200', (done) => {
      chai.request(server)
        .patch(`/api/v1/intervention/${interventionId}/status`)
        .send({ status: 'resolved' })
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('resolved');
          done();
        });
    });
  });


  describe('DELETE /api/v1/red-flags/:id', () => {
    it('should respond with unauthorised', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/27')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('Unauthoirised');

          done();
        });
    });

    it('should remove file from database and have 200 as status code red-flag', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${redFlagId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);

          expect(res.body.data[0].id).to.equal(redFlagId);

          done();
        });
    });

    it('should remove file from database and have 200 as status code for interventions', (done) => {
      chai.request(server)
        .delete(`/api/v1/interventions/${interventionId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);

          expect(res.body.data[0].id).to.equal(interventionId);

          done();
        });
    });
  });
});
