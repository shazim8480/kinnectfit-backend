import express from 'express';
import { ProfileInfoController } from './profileInfo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileInfoValidation } from './profileInfo.validation';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/create-profileinfo',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  validateRequest(ProfileInfoValidation.createZodProfileInfoSchema),
  ProfileInfoController.createProfileInfo,
);
router.get(
  '/all-profiles',
  auth(ENU_USER_ROLE.ADMIN),
  ProfileInfoController.getAllProfileInfos,
);
router.get(
  '/:id',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  ProfileInfoController.getSingleProfile,
);
export const ProfileInfoRoutes = router;
