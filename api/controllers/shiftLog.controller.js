import ShiftDetails from '../models/shiftDetails.model.js';
import ShiftLog from '../models/shiftLog.model.js';
import Uniform from '../models/uniform.model.js';
import errorHandler from '../utils/error.js';

export const createShift = async (req, res, next) => {
  try {
    const { startTime, endTime, relieved, toBeRelievedBy, equipment, uniform } =
      req.body;
    if (!startTime || !endTime || !relieved || !toBeRelievedBy) {
      return next(errorHandler(400, 'Must provide shift entry details'));
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
    });
    await shiftDetails.save();

    res.status(201).json(shiftDetails);
  } catch (error) {
    next(error);
  }
};

export const saveLog = async (req, res, next) => {
  try {
    const { time, description } = req.body;

    const saveLogDetails = new ShiftLog({ time, description });
    await saveLogDetails.save();

    res.status(201).json(saveLogDetails);
  } catch (error) {
    next(error);
  }
};
