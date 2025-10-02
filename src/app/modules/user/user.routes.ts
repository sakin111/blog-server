import express, { Router } from 'express';
import { UserController } from './user.contoller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = Router()


router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)


export const user = router;