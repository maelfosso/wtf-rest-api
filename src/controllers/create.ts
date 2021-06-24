import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymAttributes, AcronymDocument } from '../models/acronym';

const create = async (req: Request, res: Response): Promise<void> => {
  const { code, description } = req.body as AcronymAttributes;

  // check if this code already exists
  const existingAcronym: AcronymDocument | null = await Acronym.findOne({ code });
  if (existingAcronym) {
    throw new BadRequestError('ACRONYM_ALREADY_EXISTS');
  }

  // Build and save the new acronym
  const acronym: AcronymDocument = Acronym.build({ code, description });
  try {
    await acronym.save();
  } catch (err) {
    throw new DatabaseError('DB_SAVE_ERROR');
  }

  res.status(201).json({ ...acronym.toJSON() });
};

export default create;
