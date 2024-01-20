import express from 'express';
import { ProfileInfoController } from './profileInfo.controller';
const router = express.Router();
router.post('/create-profileinfo', ProfileInfoController.createProfileInfo);
export const ProfileInfoRoutes = router;
