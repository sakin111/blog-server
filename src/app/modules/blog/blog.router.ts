import express from 'express';
import { PostController } from './blog.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/blog",checkAuth(Role.ADMIN), PostController.createPost)


export const blog = router;