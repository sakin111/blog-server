import express, { Router } from 'express';
import { UserController } from './user.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = Router()


router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)
router.get("/about", checkAuth(...Object.values(Role)), UserController.aboutMe)


export const user = router;