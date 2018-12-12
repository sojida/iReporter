import express from 'express';
import incidents from '../controllers/incidents.controller';
import {
  verifyToken,
  isAdmin,
  isPresent,
  checkStatus,
  validateRoute,
} from '../middlewares/auth';

import {
  validatePost,
  validateLocation,
  validateComment,
  validateStatus,
} from '../middlewares/validation';


const router = express.Router();

router.use(validateRoute, verifyToken);

// get all incidents
router.get('/incidents', incidents.getIncidents);

// Red flags
router.get('/red-flags', incidents.getReportType);
router.get('/red-flags/:id', isPresent, incidents.getReport);
router.post('/red-flags', validatePost, incidents.postRecord);
router.patch('/red-flags/:id/location', validateLocation, checkStatus, incidents.patchLocation);
router.patch('/red-flags/:id/comment', validateComment, checkStatus, incidents.patchComment);
router.delete('/red-flags/:id', checkStatus, incidents.deleteReport);

// Interventions
router.get('/interventions', incidents.getReportType);
router.get('/interventions/:id', isPresent, incidents.getReport);
router.post('/interventions', validatePost, incidents.postRecord);
router.patch('/interventions/:id/location', validateLocation, checkStatus, incidents.patchLocation);
router.patch('/interventions/:id/comment', validateComment, checkStatus, incidents.patchComment);
router.delete('/interventions/:id', checkStatus, incidents.deleteReport);

// admin
router.patch('/red-flags/:id/status', validateStatus, isAdmin, isPresent, incidents.changeStatus);
router.patch('/interventions/:id/status', validateStatus, isAdmin, isPresent, incidents.changeStatus);

export default router;
