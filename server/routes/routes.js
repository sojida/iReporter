import express from 'express';
import incidents from '../controllers/incidents.controller';

import {
  verifyToken,
  isAdmin,
  isPresent,
  checkStatus,
  validateRoute,
  validateParams,
  myStatus,
} from '../middlewares/auth';

import {
  validatePost,
  validateLocation,
  validateComment,
  validateStatus,
} from '../middlewares/validation';

import handlemedia from '../middlewares/media';
import saveMedia from '../db/media.db';

const router = express.Router();

router.use(validateRoute, validateParams, verifyToken);

// get all incidents
router.get('/incidents', incidents.getIncidents);
router.get('/myincidents', myStatus, incidents.getMyIncidents);

// Red flags
router.get('/red-flags', incidents.getReportType);
router.get('/red-flags/:id', isPresent, incidents.getReport);
router.post('/red-flags', handlemedia, validatePost, saveMedia, incidents.postRecord);
router.patch('/red-flags/:id/location', validateLocation, checkStatus, incidents.patchLocation);
router.patch('/red-flags/:id/comment', validateComment, checkStatus, incidents.patchComment);
router.delete('/red-flags/:id', checkStatus, incidents.deleteReport);

// Interventions
router.get('/interventions', incidents.getReportType);
router.get('/interventions/:id', isPresent, incidents.getReport);
router.post('/interventions', handlemedia, validatePost, saveMedia, incidents.postRecord);
router.patch('/interventions/:id/location', validateLocation, checkStatus, incidents.patchLocation);
router.patch('/interventions/:id/comment', validateComment, checkStatus, incidents.patchComment);
router.delete('/interventions/:id', checkStatus, incidents.deleteReport);

// admin
router.patch('/red-flags/:id/status', validateStatus, isAdmin, isPresent, incidents.changeStatus);
router.patch('/interventions/:id/status', validateStatus, isAdmin, isPresent, incidents.changeStatus);

export default router;
