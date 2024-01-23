import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(UserValidation.createZodUserSchema),
  UserController.createUser,
);

router.post('/sign-in', UserController.loginUser);

router.post('/refresh-token', UserController.refreshToken);

router.get('/all-users', auth(ENU_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get('/:id', UserController.getSingleUser);

export const userRoutes = router;
