import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(UserValidation.createZodUserSchema),
  UserController.createUser,
);

router.post('/sign-in', UserController.loginUser);

router.post('/refresh-token', UserController.refreshToken);

export const userRoutes = router;
