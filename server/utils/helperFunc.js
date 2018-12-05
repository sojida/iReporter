import Incident from '../model/incident.model';
import { incidents } from '../db';

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
    const report = new Incident();
    report.id = incidents.length + 1;
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


};
