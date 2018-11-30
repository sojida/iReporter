/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import { incidents } from '../server/db';

chai.use(chaiHttp);

const goodInput = {
  createdBy: 3,
  location: '5.222222 , 5.232323',
  images: ['url'],
  videos: ['url'],
  comment: 'Civil servant collenting bribe',

};

const badInput = {
  createdBy: 3,
  location: '5.222222 , 5.232323',
  images: 'url',
  videos: 'url',
  comment: 'Civil servant collenting bribe',

};

describe('POST', () => {
  it('POST /api/v1/red-flags with good input values should increase incidents length in db', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(goodInput)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(typeof res.body.data[0].id).to.equal('number');

        const { id } = res.body.data[0];
        const newReport = incidents.find(item => item.id === id);

        expect(typeof newReport).to.equal('object');
        expect(newReport.type).to.equal('red-flag');
        done();
      });
  });

  it('POST /api/v1/interventions with good input values should increase incidents length in db', (done) => {
    chai.request(server)
      .post('/api/v1/interventions')
      .send(goodInput)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(typeof res.body.data[0].id).to.equal('number');

        const { id } = res.body.data[0];
        const newReport = incidents.find(item => item.id === id);

        expect(typeof newReport).to.equal('object');
        expect(newReport.type).to.equal('intervention');
        done();
      });
  });

  it('POST /api/v1/red-flags with bad should not increase incidents length in db and throw error', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(badInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);

        done();
      });
  });

  it('POST /api/v1/red-fla* : should respond with status 400 for typing in wrong incident-type', (done) => {
    chai.request(server)
      .post('/api/v1/red-fla*')
      .send(goodInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(typeof res.body.status).to.equal('number');
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Do you mean /red-flags or /interventions');
        done();
      });
  });
});
