import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/unitFile.controller.js';
import { getUnitFiles } from '../controllers/unitFile.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getUnitFiles', verifyToken, getUnitFiles);

export default router;
