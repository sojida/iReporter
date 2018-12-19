/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import db from '../server/db/db';
import {
  createUsersTable, createIncidentTable, deleteUser, deleteIncidents,
} from '../server/db/tables.queries';

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
        .post('/api/v1/auth/signup')
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
  });


  describe('LOGIN ', () => {
    it('should login user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
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

    it('should login admin', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'sojiman@gmail.com',
          password: 'admin1234',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);

          adminToken = res.body.data[0].token;
          adminId = res.body.data[0].user.id;


          const {
            firstname,
            lastname,
            othernames,
            email,
            phonenumber,
            username,
          } = res.body.data[0].user;

          expect(firstname).to.equal(admin.firstname);
          expect(lastname).to.equal(admin.lastname);
          expect(othernames).to.equal(admin.othernames);
          expect(email).to.equal(admin.email);
          expect(phonenumber).to.equal(admin.phoneNumber);
          expect(username).to.equal(admin.username);
          done();
        });
    });

    it('should not create new user with no credentials', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].firstname).to.equal('firstname must be present');
          done();
        });
    });

    it('should not create new user email already used', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('That email has already been used');
          done();
        });
    });

    it('should not create new user : username is same', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user,
          user.email = 'user@gmail.com')
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('That username has already been used');
          done();
        });
    });

    it('should not create new user : phonenumber alreadty exists', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user,
          user.username = 'user2',
          user.email = 'user2@gmail.com')
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('That phonenumber has already been used');
          done();
        });
    });

    it('should not create new user: password match', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user, user.password = '12345678', user.password2 = '123456789')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].password2).to.equal('password do not match');
          done();
        });
    });

    it('should not create new user: password length', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user, user.password = '1234')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].password).to.equal('password should be more than 8 characters and can have uppercase, lowercase, numbers, "@" and "-" ');
          done();
        });
    });


    it('should not login user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].email).to.equal('email is required');
          done();
        });
    });

    it('should not login user with invalid email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user,
          user.email = 'sojid')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].email).to.equal('email must be valid format: yorname@mail.com');
          done();
        });
    });

    it('should not login user with invalid detail email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user,
          user.email = 'soji2@gmail.com')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('invalid details');
          done();
        });
    });

    it('should not login user with invalid detail password', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user,
          user.email = 'soji@gmail.com',
          user.password = '123456789')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('invalid details');
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

    it('should create another new red-flag record', (done) => {
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

    it('should return error for wrong routing', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .set('Authorization', token)
        .send(goodInterventionInput)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].type).to.equal('please use the right route');
          done();
        });
    });

    it('should return error for wrong routing', (done) => {
      chai.request(server)
        .post('/api/v1/interventions')
        .set('Authorization', token)
        .send(
          goodInterventionInput,
          goodInterventionInput.type = 'interven***',
        )
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].type).to.equal('type can only be red-flag or intervention');
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

          const { error } = res.body;

          expect(error[0].type).to.equal('type must be present');
          expect(error[1].title).to.equal('title must be present');

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

          const { error } = res.body;
          expect(error[0].type).to.equal('type must be present');
          expect(error[1].title).to.equal('title must be present');
          expect(error[2].comment).to.equal('comment must be present');
          done();
        });
    });


    it('should not create new record because of wrong spelling', (done) => {
      chai.request(server)
        .post('/api/v1/red-flag*')
        .set('Authorization', token)
        .send(badInput2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);

          const { error } = res.body;
          expect(error).to.equal('Oops! did you mean red-flags or interventions. Check the spelling');


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

    it('should respond with no access', (done) => {
      chai.request(server)
        .get('/api/v1/incidents')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.error).to.equal('you need access');
          done();
        });
    });

    it('should respond personal records', (done) => {
      chai.request(server)
        .get('/api/v1/myincidents')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);

          const { data } = res.body;

          expect(res.body.error).to.equal('you need access');
          expect(Array.isArray(data)).to.be.equal(true);
          expect(res.body.status).to.be.equal(200);
          expect(data[0]).to.contain.keys('id', 'type', 'status');
          done();
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
          const { type, id } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(data.length).to.be.equal(1);
          expect(type).to.be.equal('red-flag');
          expect(id).to.be.equal(redFlagId);
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
          const { type, id } = data[0];

          expect(Array.isArray(data)).to.be.equal(true);
          expect(data.length).to.be.equal(1);
          expect(type).to.be.equal('intervention');
          expect(id).to.be.equal(interventionId);

          done();
        });
    });

    it('should not return red flag record that is not in database', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/999')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('oops! Nothing found. Check the type of record or the id');
          done();
        });
    });

    it('should not return red flag record that is not in database', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/-2')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('params must be greater than 0');
          done();
        });
    });

    it('should return with wrong route error', (done) => {
      chai.request(server)
        .get('/api/v1/red-fla*')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Oops! did you mean red-flags or interventions. Check the spelling');
          done();
        });
    });

    it('should return error for wrong param type', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/ABC')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('params must be a number');
          done();
        });
    });

    it('should return documentation page', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/1/sdf')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('check documentation on routes');
          done();
        });
    });

    it('should not return intervention record that is not in database', (done) => {
      chai.request(server)
        .get('/api/v1/interventions/0')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('params must be greater than 0');
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
          expect(res.body.error).to.equal('location format invalid. Example: (-)90.342345,(-)23.643245.');

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
          expect(res.body.error).to.equal('location must be present');

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
          expect(res.body.error).to.equal('this report is resolved');
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
          expect(res.body.error).to.equal('Comment must be present');
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
          expect(res.body.error).to.equal('this report is resolved');

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

    it('should change to rejected', (done) => {
      chai.request(server)
        .patch(`/api/v1/interventions/${interventionId}/status`)
        .send({ status: 'rejected' })
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('rejected');
          done();
        });
    });

    it('should change to investigating', (done) => {
      chai.request(server)
        .patch(`/api/v1/interventions/${interventionId}/status`)
        .send({ status: 'investigating' })
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('investigating');
          done();
        });
    });

    it('should change to resolved', (done) => {
      chai.request(server)
        .patch(`/api/v1/interventions/${interventionId}/status`)
        .send({ status: 'resolved' })
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('resolved');
          done();
        });
    });

    it('should return error on wrong input type', (done) => {
      chai.request(server)
        .patch(`/api/v1/interventions/${interventionId}/status`)
        .send({ status: 'resol*' })
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].status).to.equal('error type must be: investigating, rejected or resolved');
          done();
        });
    });

    it('should respond with error no status body', (done) => {
      chai.request(server)
        .patch(`/api/v1/interventions/${interventionId}/status`)
        .send({})
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0].status).to.equal('status must be present');
          done();
        });
    });
  });


  describe('DELETE /api/v1/red-flags/:id', () => {
    it('should respond with unauthorised', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/999')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('no such record');

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

    it('should have conflict as the report is in process', (done) => {
      chai.request(server)
        .delete(`/api/v1/interventions/${interventionId}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('this report is resolved');

          done();
        });
    });
  });
});
