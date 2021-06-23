import { Request, Response } from 'express';
import Acronym from '../models/acronym';

export const create = async (req: Request, res: Response) => {
  const { body } = req;
  const { code, description } = body;

  // check if this code already exists
  const existingAcronym = Acronym.findOne({ code });
  if (existingAcronym) {
    throw new BadRequestError(`Code already exist`);
  }

  // Build and save the new acronym
  const acronym = Acronym.build({ code, description });
  try {
    await acronym.save();
  } catch (err) {
    throw new DatabaseError(`Error when saving`);
  }

  return res.status(201).json({ data: acronym.toJSON() })
}