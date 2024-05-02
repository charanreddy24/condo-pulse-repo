import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  create,
  getIncidentReports,
} from '../controllers/incidentReport.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getIncidentReports', getIncidentReports);

export default router;
