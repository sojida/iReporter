import { incidents } from '../db';
import util from '../utils/helperFunc';

export default {
  getIncidents: (req, res) => {
    res.status(200).json({
      status: 200,
      data: [...incidents],
    });
  },

  getRedFlags: (req, res) => {
    const redFlags = util.findIncidentByType(incidents, 'red-flag');

    return res.status(200).json({
      status: 200,
      data: [...redFlags],
    });
  },

  getInterventions: (req, res) => {
    const interventions = util.findIncidentByType(incidents, 'intervention');

    return res.status(200).json({
      status: 200,
      data: [...interventions],
    });
  },

  getRedFlagById: (req, res) => {
    const report = util.findById(incidents, req.params.id, 'red-flag');

    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'no report found, check the id or the incident type',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [report],
    });
  },

  getInterventionById: (req, res) => {
    const report = util.findById(incidents, req.params.id, 'intervention');

    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'no report found, check the id or the incident type',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [report],
    });
  },

  postRecord: (req, res) => {
    const newRecord = util.newReport(req);
    incidents.push(newRecord);

    return res.status(201).json({
      status: 201,
      data: [{
        id: newRecord.id,
        record: newRecord,
        message: `created ${newRecord.type} record`,
      }],
    });
  },


  patchLocation: (req, res) => {
    const value = util.changeProperty(incidents, req, 'location');

    const err = util.checkStatus(value, res);

    if (!err) {
      return res.status(200).json({
        status: 200,
        data: [{
          id: parseFloat(req.params.id),
          record: value.value,
          message: 'Updated red-flag record',
        }],
      });
    }
    return err;
  },

  patchComment: (req, res) => {
    const value = util.changeProperty(incidents, req, 'comment');

    const err = util.checkStatus(value, res);

    if (!err) {
      return res.status(200).json({
        status: 200,
        data: [{
          id: parseFloat(req.params.id),
          record: value.value,
          message: 'Updated red-flag record',
        }],
      });
    }
    return err;
  },

  deleteIncident: (req, res) => {
    const value = util.deleteById(incidents, req, res);

    if (value) {
      res.status(200).json({
        status: 200,
        data: [{
          id: req.params.id,
          record: value,
          message: `${value[0].type} has been deleted`,
        }],
      });
    }
  },


};
