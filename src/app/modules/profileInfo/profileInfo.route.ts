import express from 'express';
import { ProfileInfoController } from './profileInfo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileInfoValidation } from './profileInfo.validation';
const router = express.Router();
router.post(
  '/create-profileinfo',
  validateRequest(ProfileInfoValidation.createZodProfileInfoSchema),
  ProfileInfoController.createProfileInfo,
);
export const ProfileInfoRoutes = router;
