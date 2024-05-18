import mongoose from 'mongoose';

const parkingRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    column: {
      type: String,
      default: 'Active Permits',
    },
    id: {
      type: String,
      default: '',
    },
    issuedOn: {
      type: Date,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
    parkingDayCount: {
      type: Number,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    vehicleMake: {
      type: String,
      required: true,
    },
    visitingUnitNumber: {
      type: Number,
      required: true,
    },
    visitorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ParkingRegistration = mongoose.model(
  'ParkingRegistration',
  parkingRegistrationSchema,
);

export default ParkingRegistration;
