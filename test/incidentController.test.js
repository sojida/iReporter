/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import { incidents } from '../server/db';

chai.use(chaiHttp);

const goodRedFlagInput = {
  createdBy: 3,
  type: 'red-flag',
  location: '5.222222,5.232323',
  images: ['url.jpg'],
  videos: ['url.mp4'],
  comment: 'Civil servant collenting bribe',
  status: 'draft',

};

const goodInterventionInput = {
  createdBy: 3,
  type: 'intervention',
  location: '5.222222,5.232323',
  images: ['url.jpg'],
  videos: ['url.mp4'],
  comment: 'Civil servant collenting bribe',
  status: 'draft',

};

const badInput = {
  createdBy: 3,
  location: '5.222222 , 5.232323',
  images: ['url', 'url2'],
  videos: ['url3', 'url4'],
  comment: 'Civil servant collenting bribe',

};

const badInput2 = {};


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


describe('GET ALL INCIDENTS', () => {
  it('should respond with all records in an array', (done) => {
    chai.request(server)
      .get('/api/v1/incidents')
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { data } = res.body;

        expect(Array.isArray(data)).to.be.equal(true);
        expect(data.length).to.be.equal(5);
        expect(res.body.status).to.be.equal(200);
        expect(data[0].type).to.be.equal('red-flag');
        done();
      });
  });
});

describe('GET RECORDS', () => {
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
});


describe('GET SPECIFIC RECORD', () => {
  it('should respond with specific red-flag record', (done) => {
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

  it('should respond with specific intervention record', (done) => {
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

  it('should not return red flag record that is not in database', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.equal(404);
        expect(res.body.message).to.be.equal('no report found, check the id or the incident type');
        done();
      });
  });

  it('should not return intervention record that is not in database', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.equal(404);
        expect(res.body.message).to.be.equal('no report found, check the id or the incident type');
        done();
      });
  });
});


describe('POST ', () => {
  it('should create a new red-flag record', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(goodRedFlagInput)
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

  it('should create a new intervention record', (done) => {
    chai.request(server)
      .post('/api/v1/interventions')
      .send(goodInterventionInput)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(typeof res.body.data[0].id).to.equal('number');
        expect(res.body.data[0].record.type).to.equal('intervention');
        done();
      });
  });

  it('should not create new record because of bad inputs', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(badInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);

        const { message } = res.body;

        expect(message[0].type).to.be.equal('type must be present');
        expect(message[1].location).to.be.equal('location format invalid. Example: (-)90.342345,(-)23.643245.');
        expect(message[2].images).to.be.equal('url this should be an image file');
        expect(message[4].videos).to.be.equal('url3 this should be a video file');

        done();
      });
  });

  it('should not create new record because of bad inputs', (done) => {
    chai.request(server)
      .post('/api/v1/red-flags')
      .send(badInput2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);

        const { message } = res.body;

        expect(message[0].createdBy).to.be.equal('createdBy must be present');
        expect(message[1].type).to.be.equal('type must be present');
        expect(message[2].comment).to.be.equal('comment must be present');
        done();
      });
  });
});

const { location, comment } = {
  location: '10.223432,5.232423',
  comment: 'People are being harassed by police',
};

const { badLocation, badComment } = {
  badLocation: '11.3454, abxh',
  badComment: '',
};

describe('PATCH LOCATION  /api/v1/red-flags/:id/location', () => {
  it('should update specific location', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/2/location')
      .send({ location })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(typeof res.body.data[0].id).to.equal('number');

        const newReport = incidents.find(item => item.id === 2);

        expect(typeof newReport).to.equal('object');
        expect(newReport.location).to.equal(location);
        done();
      });
  });

  it('should return with no record', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/0/location')
      .send({ location })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Resource not found');
        done();
      });
  });

  it('should return with bad request', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/2/location')
      .send({ badLocation })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('location must be present');

        done();
      });
  });

  it('should have conflict because the status is not draft ', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
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
      .patch('/api/v1/red-flags/2/comment')
      .send({ comment })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(typeof res.body.data[0].id).to.equal('number');

        const newReport = incidents.find(item => item.id === 2);

        expect(typeof newReport).to.equal('object');
        expect(newReport.comment).to.equal(comment);
        done();
      });
  });

  it('should not return a resource', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/0/comment')
      .send({ comment })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Resource not found');
        done();
      });
  });

  it('should return with bad request', (done) => {
    chai.request(server)
      .patch('/api/v1/red-flags/2/comment')
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
      .patch('/api/v1/red-flags/1/comment')
      .send({ comment })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('report status is resolved, rejected or under-investigation');

        done();
      });
  });
});


describe('DELETE /api/v1/red-flags/:id', () => {
  it('should respond with bad request', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(typeof res.body.status).to.equal('number');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Resource not found');

        done();
      });
  });

  it('should remove file from database and have 200 as status code', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/4')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);

        const delReport = incidents.find(item => item.id === 4);

        expect(delReport).to.be.equal(undefined);
        expect(res.body.data[0].record[0].id).to.equal(4);

        done();
      });
  });
});
