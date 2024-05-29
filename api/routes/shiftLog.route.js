import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createShift, saveLog } from '../controllers/shiftLog.controller.js';

const router = express.Router();

router.post('/createShift', verifyToken, createShift);
router.post('/saveLog', verifyToken, saveLog);

export default router;
