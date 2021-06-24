import express from 'express';
import { body } from 'express-validator';
import { create, get, getAll, update } from '../controllers';
import validateRequest from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/acronym',
  [
    body('code')
      .notEmpty()
      .withMessage('Code must be defined'),
    body('description')
      .notEmpty()
      .withMessage('Description must be defined'),
  ],
  validateRequest,
  create,
);

router.get(
  '/acronym/:code',
  get,
);

router.get(
  '/acronym',
  getAll,
);

router.put(
  '/acronym',
  update,
);

export default router;
