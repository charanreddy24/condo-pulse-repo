import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  checkActiveShift,
  createShift,
  saveLog,
  getShiftLogs,
  getShiftReports,
} from '../controllers/shiftLog.controller.js';

const router = express.Router();

router.post('/createShift', verifyToken, createShift);
router.post('/saveLog', verifyToken, saveLog);
router.get('/checkActiveShift', verifyToken, checkActiveShift);
router.get('/getShiftLogs', getShiftLogs);
router.get('/getShiftReports', getShiftReports);

export default router;
