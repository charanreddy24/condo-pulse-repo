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
    const files = [];
    const incidentReportData = {
      ...req.body,
      slug,
      userId: req.user.id,
      files: files,
    };

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        files.push({
          filename: file.originalname,
          contentType: file.mimetype,
          data: file.buffer,
        });
      });
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

export const getIncidentReports = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const incidentReports = await IncidentReport.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.incidentType && { incidentType: req.query.incidentType }),
      ...(req.query.incidentReportId && { _id: req.query.incidentReportId }),

      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .populate('files')
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalIncidentReports = await IncidentReport.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    const lastMonthIncidentReports = await IncidentReport.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      incidentReports,
      totalIncidentReports,
      lastMonthIncidentReports,
    });
  } catch (error) {
    next(error);
  }
};
