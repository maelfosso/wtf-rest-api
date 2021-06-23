import express from 'express';
import { body } from 'express-validator';
import { create } from '../controllers';
import { validateRequest } from '../middlewares/validate-request';

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
  create
)

export { router as apiRoutes };
