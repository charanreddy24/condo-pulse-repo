import mongoose from 'mongoose';

const shiftLog = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ShiftLog = mongoose.model('ShiftLog', shiftLog);

export default ShiftLog;
