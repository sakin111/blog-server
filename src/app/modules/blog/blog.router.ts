import express from 'express';
import { PostController } from './blog.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/blogPost",checkAuth(Role.ADMIN), PostController.createPost)
router.get("/blogGet",PostController.getAllPosts)
router.get("/:id", PostController.getPostById);
router.patch("/:id",checkAuth(Role.ADMIN), PostController.updatePost);
router.delete("/:id",checkAuth(Role.ADMIN), PostController.deletePost);


export const blog = router;