import { incidents } from '../db';
import util from '../utils/helperFunc';

export default {
  getByIncidentType: (req, res) => {
    const typeOfIncident = util.incidentType(req.params.incidentType);
    if (typeOfIncident === undefined) {
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
};
