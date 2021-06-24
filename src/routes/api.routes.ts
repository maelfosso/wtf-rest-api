import express from 'express';
import { body } from 'express-validator';
import {
  create, get, getAll, remove, update,
} from '../controllers';
import requireAuth from '../middlewares/required-auth';
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
  requireAuth,
  update,
);

router.delete(
  '/acronym/:code',
  requireAuth,
  remove,
);

export default router;
