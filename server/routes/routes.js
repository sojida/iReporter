import express from 'express';
import incidents from '../controllers/incidents.controller';
import { validatePost, validateLocation, validateComment } from '../middlewares/validation';

const router = express.Router();


// get all incidents
router.get('/incidents', incidents.getIncidents);

// Red flags
router.get('/red-flags', incidents.getRedFlags);
router.get('/red-flags/:id', incidents.getRedFlagById);
router.post('/red-flags', validatePost, incidents.postRecord);
router.patch('/red-flags/:id/location', validateLocation, incidents.patchLocation);
router.patch('/red-flags/:id/comment', validateComment, incidents.patchComment);
router.delete('/red-flags/:id', incidents.deleteIncident);

// Interventions
router.get('/interventions', incidents.getInterventions);
router.get('/interventions/:id', incidents.getInterventionById);
router.post('/interventions', validatePost, incidents.postRecord);
router.patch('/interventions/:id/location', validateLocation, incidents.patchLocation);
router.patch('/interventions/:id/comment', validateComment, incidents.patchComment);
router.delete('/interventions/:id', incidents.deleteIncident);


export default router;
