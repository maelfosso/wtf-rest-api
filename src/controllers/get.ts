import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymDocument } from '../models/acronym';

const get = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params as { code: string };

  let acronym: AcronymDocument | null;
  try {
    acronym = await Acronym.findOne({ code });
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new DatabaseError('DB_FETCH_ERROR', err.message);
  }

  if (!acronym) {
    throw new BadRequestError('ACRONYM_NOT_EXIST');
  }

  res.status(200).json(acronym?.toJSON());
};

export default get;
