
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


};
