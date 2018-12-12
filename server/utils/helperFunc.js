import Incident from '../model/incident.model';
import User from '../model/users.model';
import { incidents, users } from '../db';
import Users from '../model/users.model';

export default {

  findIncidentByType: (db, type) => {
    const reports = db.filter(item => item.type === type);
    return reports;
  },

  findById: (db, id, type) => {
    const report = db.find(item => (item.type === type && item.id === parseFloat(id)));
    return report;
  },

  newReport: (req) => {
    const newId = incidents[incidents.length - 1].id;
    const report = new Incident();

    report.id = newId + 1;
    report.createdBy = req.body.createdBy;
    report.type = req.body.type;
    report.location = req.body.location;
    report.images = req.body.images;
    report.videos = req.body.videos;
    report.comment = req.body.comment;
    report.status = 'draft';

    return report;
  },

  changeProperty: (db, req, property) => {
    const reportStatus = {
      found: false,
      changed: false,
      value: null,
    };

    db.find((item) => {
      if (item.id === parseFloat(req.params.id)) {
        reportStatus.found = true;
        if (item.status === 'draft') {
          item[property] = req.body[property];
          reportStatus.changed = true;
          reportStatus.value = item;
        }
      }
    });

    return reportStatus;
  },

  checkStatus: (status, res) => {
    if (!status.found) {
      return res.status(404).json({
        status: 404,
        error: 'Resource not found',
      });
    }

    if (status.found && !status.changed) {
      return res.status(409).json({
        status: 409,
        error: 'report status is resolved, rejected or under-investigation',
      });
    }
  },

  deleteById: (db, req, res) => {
    let deleted = false;
    let value = null;

    const { id } = req.params;

    incidents.forEach((item, i) => {
      if (parseFloat(id) === item.id) {
        value = incidents.splice(i, 1);
        deleted = true;
      }
    });


    if (deleted) {
      return value[0];
    }

    res.status(404).send({
      status: 404,
      error: 'Resource not found',
    });
  },

  createUser: (req) => {
    const newId = users[users.length - 1].id;
    const user = new Users();

    user.id = newId + 1;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.othernames = req.body.othernames;
    user.phoneNumber = req.body.phoneNumber;
    user.username = req.body.username;
    user.email = req.body.email;

    return user;

  },

  findUser: (req) => {
    const { email } = req.body;

    const user = users.find(item => item.email === email);

    return user;
  }


};
