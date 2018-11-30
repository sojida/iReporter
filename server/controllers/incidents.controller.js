import { incidents } from '../db';
import util from '../utils/helperFunc';
import validateIncident from '../utils/validateIncident';

export default {
  getIncidents: (req, res) => {
    res.status(200).json({
      status: 200,
      data: [...incidents],
    });
  },

  getByIncidentType: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (!typeOfIncident) {
      return res.status(400).json({
        status: 400,
        message: 'Oops! Did you mean red-flags or interventions',
      });
    }

    const report = util.findIncidentByType(incidents, typeOfIncident);

    return res.status(200).json({
      status: 200,
      data: [...report],
    });
  },

  getIncidentById: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);

    const report = util.findByTypeAndId(incidents, typeOfIncident, req.params.id);

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

  postIncident: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (!typeOfIncident) {
      return res.status(400).json({
        status: 400,
        message: 'Do you mean /red-flags or /interventions',
      });
    }
    const report = util.newReport(req, typeOfIncident);

    const result = validateIncident(report);

    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }

    incidents.push(report);

    return res.status(201).json({
      status: 201,
      data: [{
        id: report.id,
        message: `created ${req.params.incidentType} record`,
      }],
    });
  },

  patchLocation: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (!typeOfIncident) {
      return res.status(400).json({
        status: 400,
        message: 'Do you mean red-flags or interventions',
      });
    }

    const { found, changed } = util.changeProperty(incidents, req, 'location');

    if (!found) {
      return res.status(404).json({
        status: 404,
        error: 'Resource not found',
      });
    }

    if (found && !changed) {
      return res.status(409).json({
        status: 409,
        error: 'report status is resolved, rejected or under-investigation',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [{
        id: parseFloat(req.params.id),
        message: 'Updated red-flag record',
      }],
    });
  },

  patchComment: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (!typeOfIncident) {
      return res.status(400).json({
        status: 400,
        message: 'Do you mean red-flags or interventions',
      });
    }

    const { found, changed } = util.changeProperty(incidents, req, 'comment');

    if (!found) {
      return res.status(404).json({
        status: 404,
        error: 'Resource not found',
      });
    }

    if (found && !changed) {
      return res.status(409).json({
        status: 409,
        error: 'report status is resolved, rejected or under-investigation',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [{
        id: parseFloat(req.params.id),
        message: 'Updated red-flag record',
      }],
    });
  },

  deleteIncident: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (typeOfIncident === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Do you mean /red-flags or /interventions',
      });
    }

    const result = util.deleteById(incidents, parseFloat(req.params.id));

    if (!result.delete) {
      return res.status(404).send({
        status: 404,
        error: 'Resource not found',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [{
        id: parseFloat(req.params.id),
        message: `${typeOfIncident} record has been deleted`,
      }],
    });
  },


};
