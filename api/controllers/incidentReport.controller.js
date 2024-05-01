import IncidentReport from '../models/incidentReport.model.js';
import errorHandler from '../utils/error.js';

export const create = async (req, res, next) => {
  try {
    const requiredFields = [
      'title',
      'incidentType',
      'incidentDate',
      'description',
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(errorHandler(400, `Please provide ${field}`));
      }
    }
    const slug = generateSlug(req.body.title);
    const incidentReportData = {
      ...req.body,
      slug,
      userId: req.user.id,
    };

    if (req.files && req.files.length > 0) {
      incidentReportData.files = req.files.map((file) => ({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      }));
    } else {
      // If no files were uploaded, set files to an empty array
      incidentReportData.files = [];
    }
    const newIncidentReport = new IncidentReport(incidentReportData);
    const savedIncidentReport = await newIncidentReport.save();

    res.status(201).json(savedIncidentReport);
  } catch (error) {
    next(error);
  }
};

const generateSlug = (title) => {
  return (
    title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[^a-z0-9-]/g, '') +
    '-' +
    Math.random().toString(9).slice(-4)
  );
};
