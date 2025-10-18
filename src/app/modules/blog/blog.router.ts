import express from 'express';
import { PostController } from './blog.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/blogPost",checkAuth(Role.ADMIN), PostController.createPost)
router.get("/blogGet",PostController.getAllPosts)
router.get("/:id", PostController.getPostById);
router.post("/project",checkAuth(Role.ADMIN), PostController.postProject);
router.patch("/:id",checkAuth(Role.ADMIN), PostController.updatePost);
router.patch("/project/:id",checkAuth(Role.ADMIN), PostController.updateProject);
router.get("/project", PostController.getAllProject);
router.get("/project/:id",checkAuth(Role.ADMIN), PostController.getProjectById);
router.delete("/:id",checkAuth(Role.ADMIN), PostController.deletePost);
router.delete("/project/:id",checkAuth(Role.ADMIN), PostController.deleteProject);


export const blog = router;