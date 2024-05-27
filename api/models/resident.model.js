import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  residentType: {
    type: String,
    required: true,
    enum: ['Renter', 'Owner'],
  },
});

const Resident = mongoose.model('Resident', residentSchema);
export default Resident;
