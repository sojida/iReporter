import Incident from '../model/incident.model';
import { incidents } from '../db';

export default {
  incidentType: (reqType) => {
    if (reqType === 'red-flags') {
      return 'red-flag';
    }

    if (reqType === 'interventions') {
      return 'intervention';
    }

    return undefined;
  },

  findIncidentByType: (db, type) => {
    const reports = db.filter(item => item.type === type);
    return reports;
  },

  findByTypeAndId: (db, type, id) => {
    const report = db.find(item => (item.type === type && item.id === parseFloat(id)));
    return report;
  },

  newReport: (req, type) => {
    const report = new Incident();
    report.id = incidents.length + 1;
    report.createdBy = req.body.createdBy;
    report.type = type;
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
    };

    const record = db.find(item => item.id === parseFloat(req.params.id));

    if (record) {
      reportStatus.found = true;
    } else {
      return reportStatus;
    }

    if (record.status === 'draft') {
      record[property] = req.body[property];
      reportStatus.changed = true;
    }
    return reportStatus;
  },

  deleteById: (db, id) => {
    const deleted = {
      value: null,
      delete: false,
    };

    db.forEach((item, i) => {
      if (item.id === id) {
        deleted.value = db.splice(i, 1);
        deleted.delete = true;
      }
    });
    return deleted;
  },


};
