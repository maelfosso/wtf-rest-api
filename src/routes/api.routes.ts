import express from 'express';
import { body } from 'express-validator';
import { create, get } from '../controllers';
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


export default router;
