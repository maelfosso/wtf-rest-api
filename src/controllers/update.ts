import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymAttributes, AcronymDocument } from '../models/acronym';

const update = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params;
  const { description } = req.body as AcronymAttributes;

  // Check if this code already exists
  const acronym: AcronymDocument | null = await Acronym.findOne({ code });
  if (!acronym) {
    throw new BadRequestError('ACRONYM_NOT_EXISTS', `Code nod exist. An acronym with this code (${code}) does not exist. Update is not possible`);
  }

  // Replace document with new values
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    await Acronym.updateOne({ _id: acronym?._id }, { description });
  } catch (err) {
    throw new DatabaseError('DB_UPDATE_ERROR');
  }

  res.status(200).json({ success: true });
};

export default update;
