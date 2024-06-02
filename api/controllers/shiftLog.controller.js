import ShiftDetails from '../models/shiftDetails.model.js';
import { Log, ShiftLog } from '../models/shiftLog.model.js';
import Uniform from '../models/uniform.model.js';
import errorHandler from '../utils/error.js';
import schedule from 'node-schedule';

export const createShift = async (req, res, next) => {
  try {
    const {
      startTime,
      endTime,
      relieved,
      toBeRelievedBy,
      equipment,
      uniform,
      userId,
    } = req.body;

    if (!startTime || !endTime || !relieved || !toBeRelievedBy || !userId) {
      return next(errorHandler(400, 'Must provide shift entry details'));
    }

    const existingShift = await ShiftDetails.findOne({
      userId,
      shiftActive: true,
    });

    if (existingShift) {
      return next(errorHandler(400, 'You already have an active shift'));
    }

    const uniformData = new Uniform(uniform);
    await uniformData.save();

    const shiftDetails = new ShiftDetails({
      startTime,
      endTime,
      relieved,
      toBeRelievedBy,
      equipment,
      uniform: uniformData,
      userId,
    });
    await shiftDetails.save();

    const shiftLog = new ShiftLog({
      userId,
      shiftDetails: shiftDetails._id,
      logs: [],
    });
    await shiftLog.save();

    schedule.scheduleJob(
      // new Date(Date.now() + 13 * 60 * 60 * 1000),
      new Date(Date.now() + 100000),
      async () => {
        shiftDetails.shiftActive = false;
        await shiftDetails.save();
      },
    );

    res.status(201).json({ shiftDetails, shiftLog });
  } catch (error) {
    next(error);
  }
};

export const saveLog = async (req, res, next) => {
  try {
    const { time, description, userId } = req.body;

    const latestShift = await ShiftLog.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate('shiftDetails');

    if (!latestShift) {
      return next(errorHandler(404, 'No active shift found'));
    }

    const newLog = new Log({ time, description });
    await newLog.save();

    latestShift.logs.push(newLog._id);
    await latestShift.save();

    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

export const checkActiveShift = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return next(errorHandler(400, 'User ID is required'));
    }

    const activeShift = await ShiftDetails.findOne({
      userId,
      shiftActive: true,
    });

    res.status(200).json({ activeShift });
  } catch (error) {
    next(error);
  }
};

export const getShiftLogs = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const latestShift = await ShiftLog.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'logs',
        model: Log,
      });

    if (!latestShift) {
      return next(errorHandler(404, 'No active Shift Found'));
    }

    res.status(200).json(latestShift.logs);
  } catch (error) {
    next(error);
  }
};
