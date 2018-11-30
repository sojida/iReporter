import express from 'express';
import incidents from '../controllers/incidents.controller';

const router = express.Router();

// get incident type
router.get('/:incidentType', incidents.getByIncidentType);

// get specific incident
router.get('/:incidentType/:id', incidents.getIncidentById);


export default router;
