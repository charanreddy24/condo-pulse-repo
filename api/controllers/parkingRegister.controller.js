import ParkingRegistration from '../models/parkingRegister.model.js';
import errorHandler from '../utils/error.js';

export const create = async (req, res, next) => {
  try {
    const requiredFields = [
      'licensePlate',
      'issuedOn',
      'parkingDayCount',
      'validUntil',
      'vehicleColor',
      'vehicleMake',
      'visitingUnitNumber',
      'visitorName',
    ];
    for (const field of requiredFields) {
      if (!req.body.content[field]) {
        return next(errorHandler(400, `Please provide ${field}`));
      }
    }

    const parkingPermitData = {
      ...req.body.content,
      userId: req.user.id,
      parkingDayCount: parseInt(req.body.content.parkingDayCount),
    };

    const newParkingPermit = new ParkingRegistration(parkingPermitData);
    const savedParkingPermit = await newParkingPermit.save();

    res.status(201).json(savedParkingPermit);
  } catch (error) {
    next(error);
  }
};
