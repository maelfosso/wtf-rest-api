import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymDocument } from '../models/acronym';

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params;
  let existingAcronym: AcronymDocument | null;
  
  try {
    existingAcronym = await Acronym.findOne({ code });
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new DatabaseError('DB_FIND_ERROR', err.message);
  }
  
  if (!existingAcronym) {
    throw new BadRequestError('ACRONYM_NOT_EXIST');
  }
  
  try {
    await Acronym.remove({ code });
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new DatabaseError('DB_REMOVE_ERROR', err.message);
  }

  res.status(200).send({ success: true });
};

export default remove;
