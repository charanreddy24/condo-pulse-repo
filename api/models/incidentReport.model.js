import mongoose from 'mongoose';

const incidentReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    files: {
      type: String,
      default: '',
    },
    incidentType: {
      type: String,
      default: 'Trespassers',
    },
    incidentDate: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const IncidentReport = mongoose.model('IncidentReport', incidentReportSchema);

export default IncidentReport;
