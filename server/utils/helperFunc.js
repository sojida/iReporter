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


};
