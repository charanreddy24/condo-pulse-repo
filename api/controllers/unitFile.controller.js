import UnitFile from '../models/unitFile.model.js';
import Resident from '../models/resident.model.js';
import errorHandler from '../utils/error.js';

export const create = async (req, res, next) => {
  try {
    const { unitNumber, residents, licensePlate, spotDetails } = req.body;

    if (!unitNumber || !residents || !Array.isArray(residents)) {
      return next(errorHandler(400, 'Must have resident complete details'));
    }

    const residentIds = await Promise.all(
      residents.map(async (residentData) => {
        const resident = new Resident(residentData);
        await resident.save();
        return resident._id;
      }),
    );

    const unitFile = new UnitFile({
      unitNumber,
      residents: residentIds,
      licensePlate,
      spotDetails,
    });

    await unitFile.save();
    res.status(201).json(unitFile);
  } catch (error) {
    next(error);
  }
};
