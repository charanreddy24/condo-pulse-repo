import IncidentReport from '../models/incidentReport.model.js';
import errorHandler from '../utils/error.js';

export const create = async (req, res, next) => {
  // if (req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this user'));
  // }

  if (
    !req.body.title ||
    !req.body.incidentType ||
    !req.body.incidentDate ||
    !req.body.description
  ) {
    return next(errorHandler(400, 'Please fill out all the fields'));
  }
  const slug =
    req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-') + Math.random().toString(9).slice(-4);

  const newIncidentReport = new IncidentReport({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedIncidentReport = await newIncidentReport.save();
    res.status(201).json(savedIncidentReport);
  } catch (error) {
    next(error);
  }
};
