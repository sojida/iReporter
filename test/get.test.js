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

        expect(Array.isArray(data)).to.be.equal(true);
        done();
      });
  });
});
