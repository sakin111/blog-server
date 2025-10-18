import { Request, Response } from "express";
import { PostService } from "./blog.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes"



const createPost = catchAsync(async(req: Request, res: Response) => {

    const userId = Number(req.user?.user);
    console.log("User ID from JWT:", userId);
    console.log("Incoming blog payload:", req.body);

    const result = await PostService.createPost(userId, req.body);
     sendResponse(res,{
           success: true,
           statusCode: httpStatus.OK,
           message: "user retrieve successfully",
           data: result   
            
         }) 
    
  } )




const getAllPosts = catchAsync(async (req: Request, res: Response) => {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Posts retrieved successfully",
            data: result.data 
        });

})

const getPostById = catchAsync(async(req: Request, res: Response) => {
    const post = await PostService.getPostById(Number(req.params.id));
    if (!post) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "Post not found",
            data: null
        });
        return;
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved successfully",
        data: post
    });
})

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  const payload = { id: Number(req.params.id), ...req.body };
  const updatedPost = await PostService.updatePost(payload);

  if (!updatedPost) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Post not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: updatedPost,
  });
});


export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload = { id: Number(req.params.id), ...req.body };
  const updatedPost = await PostService.updatePost(payload);

  if (!updatedPost) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "user not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user updated successfully",
    data: updatedPost,
  });
});


export const updateProject = catchAsync(async (req: Request, res: Response) => {
  const payload = { id: Number(req.params.id), ...req.body };
  const updated = await PostService.updateProject(payload);

  if (!updated) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: updated,
  });
});
export const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.search as string) || "";
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

  const result = await PostService.getAllProject({ page, limit, search, tags });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result.data,
  });
});


export const postProject = catchAsync(async (req: Request, res: Response) => {
const userId = Number(req.user?.user); 
    if (!userId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized user",
        data: null
      });
    }

    const result = await PostService.projectService(req.body, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Project created successfully",
      data: result,
    });
  })



export const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const project = await PostService.getProjectById(id);

  if (!project) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: project,
  });
});
export const deletePost = catchAsync(async (req: Request, res: Response) => {
  const deleted = await PostService.deletePost(Number(req.params.id));

  if (!deleted) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Post not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully",
    data: null,
  });
});


export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
  deletePost,
  updateProject,
  getAllProject,
  getProjectById,
  postProject

}