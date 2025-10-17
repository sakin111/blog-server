import express, { Router } from 'express';
import { UserController } from './user.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = Router()


router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)
router.get("/about", UserController.aboutMe)
router.patch("/:id", checkAuth(...Object.values(Role)), UserController.updateMe)


export const user = router;