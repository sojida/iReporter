import { incidents } from '../db';
import util from '../utils/helperFunc';
import validateIncident from '../utils/validateIncident';

export default {
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


};
