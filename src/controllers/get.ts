import { Request, Response } from 'express';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymDocument } from '../models/acronym';

const get = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params as { code: string };
  
  let acronym: AcronymDocument | null; 
  try {
    acronym = await Acronym.findOne({ code });
  } catch(err) {
    throw new DatabaseError(`Error occured when retreiving acronym(${code})`, err.message);
  }

  res.status(200).send({ ...acronym?.toJSON() });
}

export default get;
