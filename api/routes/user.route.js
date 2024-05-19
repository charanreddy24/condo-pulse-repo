import express from 'express';
import {
  signout,
  test,
  updateUser,
  getUsers,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.post('/signout', signout);
router.get('/getUsers', verifyToken, getUsers);

export default router;
