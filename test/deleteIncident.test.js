/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('DELETE', () => {
  it('DELETE /api/v1/red-flags/2 should respond with 200 deleted', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(typeof res.body.data[0].id).to.equal('number');

        const { id } = res.body.data[0];
        const delReport = incidents.find(item => item.id === id);

        expect(delReport).to.be.equal(undefined);
        done();
      });
  });

  it('DELETE /api/v1/red-fla*/2 : should respond with status 400 for typing in wrong incident-type', (done) => {
    chai.request(server)
      .delete('/api/v1/red-fla*/2')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(typeof res.body.status).to.equal('number');
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Do you mean /red-flags or /interventions');
        done();
      });
  });

  it('DELETE /api/v1/red-flags/0 : should respond with status 404', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(typeof res.body.status).to.equal('number');
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});
