import express from 'express';
import incidents from '../controllers/incidents.controller';

const router = express.Router();


// get all incidents
router.get('/incidents', incidents.getIncidents);

// get incident type
router.get('/:incidentType', incidents.getByIncidentType);

// get specific incident
router.get('/:incidentType/:id', incidents.getIncidentById);

// post an incident
router.post('/:incidentType', incidents.postIncident);

// patch incident location
router.patch('/:incidentType/:id/location', incidents.patchLocation);

// patch incident comment
router.patch('/:incidentType/:id/comment', incidents.patchComment);

// delete incident
router.delete('/:incidentType/:id', incidents.deleteIncident);

export default router;
