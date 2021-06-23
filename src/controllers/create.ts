import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { DatabaseError } from '../errors/database-error';
import Acronym from '../models/acronym';

export const create = async (req: Request, res: Response) => {
  const { body } = req;
  const { code, description } = body;

  // check if this code already exists
  const existingAcronym = await Acronym.findOne({ code });
  if (existingAcronym) {
    throw new BadRequestError('ACRONYM_ALREADY_EXISTS');
  }

  // Build and save the new acronym
  const acronym = Acronym.build({ code, description });
  try {
    await acronym.save();
  } catch (err) {
    throw new DatabaseError('DB_SAVE_ERROR');
  }

  return res.status(201).json({ data: acronym.toJSON() })
}