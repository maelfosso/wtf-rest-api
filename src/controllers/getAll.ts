import { Request, Response } from 'express';
import DatabaseError from '../errors/database-error';
import Acronym, { AcronymDocument } from '../models/acronym';
import escapeStringRegex from '../utils/excapse-string-regex';

const getAll = async (req: Request, res: Response): Promise<void> => {
  const { from, limit, search } = req.query;
  let data: AcronymDocument[];

  let options = {};
  if (search) {
    const regex = new RegExp(escapeStringRegex(search as string));

    options = {
      $or: [
        { code: { $regex: regex, $options: 'xsim' } },
        { description: { $regex: regex, $options: 'xsim' } },
      ],
    };
  }

  try {
    const offset = parseInt(from as string, 10);
    const max = parseInt(limit as string, 10);

    data = await Acronym
      .find(options)
      .skip(offset > 0 ? offset : 0)
      .limit(max || 0);

    let remaining = 0;
    if (max) {
      remaining = await Acronym.count() - max;
    }
    if (offset) {
      remaining -= offset;
    }

    res.set('X-REMAINING', remaining.toString());
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new DatabaseError('DB_FETCH_ERROR', err.message);
  }

  res.status(200).json(data);
};

export default getAll;
