import express from 'express';
import {
  getMessages,
  getUnreadCounts,
  sendMessage,
} from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/unreadCounts', verifyToken, getUnreadCounts);
router.post('/send/:id', verifyToken, sendMessage);
router.get('/:id', verifyToken, getMessages);

export default router;
