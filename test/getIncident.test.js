/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('INCIDENTS', () => {
  it('GET /api/v1/incidents should respond with all records', (done) => {
    chai.request(server)
      .get('/api/v1/incidents')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { data } = res.body;

        expect(Array.isArray(data)).to.be.equal(true);
        done();
      });
  });

  it('GET /api/v1/red-flags should respond with red-flag records', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { data } = res.body;
        const { type } = data[0];

        expect(Array.isArray(data)).to.be.equal(true);
        expect(type).to.be.equal('red-flag');
        done();
      });
  });

  it('GET /api/v1/interventions  should respond with intervention records', (done) => {
    chai.request(server)
      .get('/api/v1/interventions')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { data } = res.body;
        const { type } = data[0];

        expect(Array.isArray(data)).to.be.equal(true);
        expect(type).to.be.equal('intervention');
        done();
      });
  });

  it('GET /api/v1/inter-redflag: should respond with error for wrong input type', (done) => {
    chai.request(server)
      .get('/api/v1/inter-redflag')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe('Specific incident', () => {
  it('GET /api/v1/red-flags/1: should respond with red-flag record', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/1')
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

  it('GET /api/v1/interventions/3: should respond with intervention record', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/3')
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

  it('GET /api/v1/red-flags/1: should respond with red-flag record and id of 1', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/1')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { data } = res.body;
        const { type, id } = data[0];

        expect(Array.isArray(data)).to.be.equal(true);
        expect(data.length).to.be.equal(1);
        expect(type).to.be.equal('red-flag');
        expect(id).to.be.equal(1);
        done();
      });
  });

  it('GET /api/v1/intervention*/3: should respond with error on wrong input type', (done) => {
    chai.request(server)
      .get('/api/v1/inter-redflag')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('GET /api/v1/interventions/0: should respond with error: 404', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
