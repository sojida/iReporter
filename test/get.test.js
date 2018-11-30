/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('Incidents', () => {
  it('should respond with red-flag records', (done) => {
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

  it('should respond with intervention records', (done) => {
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

  it('should respond with ierror on wrong input type', (done) => {
    chai.request(server)
      .get('/api/v1/inter-redflag')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
