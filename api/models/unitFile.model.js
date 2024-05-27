import mongoose from 'mongoose';

const unitFileSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: String,
      required: true,
      unique: true,
    },
    residents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        default: [],
      },
    ],
    licensePlate: {
      type: String,
      unique: true,
    },
    spotDetails: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const UnitFile = mongoose.model('UnitFile', unitFileSchema);

export default UnitFile;
