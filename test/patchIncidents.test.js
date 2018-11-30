/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import { incidents } from '../server/db';

chai.use(chaiHttp);

const { location } = {
  location: '10.223432 , 5.232423',
};


describe('PATCH', () => {
  it('PATCH /api/v1/red-flags/1/location with good input values should update specific location', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .send(location)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(typeof res.body.data[0].id).to.equal('number');

        const newReport = incidents.find(item => item.id === 1);

        expect(typeof newReport).to.equal('object');
        expect(newReport.location).to.equal(location);
        done();
      });
  });

  it('PATCH /api/v1/red-flags/0/location with invalid id ', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/0/location')
      .send(location)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });

  it('PATCH /api/v1/red-flags/2/location when status is not draft ', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/2/location')
      .send(location)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        done();
      });
  });

  it('PATCH /api/v1/red-flags/2/location when incident type is wrong', (done) => {
    chai.request(server)
      .patch('/api/v1/red-fl*gs/2/location')
      .send(location)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
