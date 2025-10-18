import { Post, Prisma, Project } from "@prisma/client";
import { prisma } from "../../../config/db";

import AppError from "../../ErrorBuilder/AppError";


interface UpdatePostPayload {
  id: number;
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  views?: number;
  isFeatured?: boolean;
}

interface UpdateProjectPayload {
    id: number;
    thumbnail?: string;
    liveLink?: string;
    liveSite?: string;
    description?: string;
    features?: string[];
}



 const createPost = async (
  userId: number,
  payload: Prisma.PostCreateInput
) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user) throw new AppError(404, "User not found");
  if (user.role !== "ADMIN") throw new AppError(403, "Only admins can create posts");

    const { tags, ...rest } = payload;
    console.log(tags,"this is tags");
    const post = await prisma.post.create({
      data: {
        ...rest,
        tags: tags || [],
        author: { connect: { id: userId } },
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    return post;

};








const updatePost = async (payload: UpdatePostPayload): Promise<Post> => {
  const { id, ...data } = payload;


    const prismaData: Prisma.PostUpdateInput = {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),

    } as Prisma.PostUpdateInput;

    const result = await prisma.post.update({
        where: { id },
        data: prismaData,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

  return result;
};




const updateUser = async (payload: UpdatePostPayload): Promise<Post> => {
  const { id, ...data } = payload;


    const prismaData: Prisma.PostUpdateInput = {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),

    } as Prisma.PostUpdateInput;

    const result = await prisma.post.update({
        where: { id },
        data: prismaData,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

  return result;
};


const updateProject = async (payload: UpdateProjectPayload): Promise<Project> => {
  const { id, ...data } = payload;

  const prismaData: Prisma.ProjectUpdateInput = {
    ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.features !== undefined && { features: data.features }),
    ...(data.liveLink !== undefined && { liveLink: data.liveLink }),
    ...(data.liveSite !== undefined && { liveSite: data.liveSite }),
  } as Prisma.ProjectUpdateInput;

  const result = await prisma.project.update({
    where: { id },
    data: prismaData,
  });

  return result;
};


const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.post.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getAllProject = async ({
    page = 1,
    limit = 10,
    search,
    tags,
}: {
    page?: number;
    limit?: number;
    search?: string;
    tags?: string[];
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && { description: { contains: search, mode: "insensitive" } },
            tags && tags.length > 0 && { features: { hasEvery: tags } },
        ].filter(Boolean),
    };

    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        orderBy: { createdAt: "desc" },
    });

    const total = await prisma.project.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const getProjectById = async (id: number) => {
    return await prisma.project.findUnique({
        where: { id },
    });
};

const getPostById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
        });

        return await tx.post.findUnique({
            where: { id },
            include: { author: true },
        });
    });
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

const deleteProject = async (id: number) => {
    return prisma.project.delete({ where: { id } });
};



const projectService = async (payload: Prisma.ProjectCreateInput,
    userId: number) => {
       const newProject = await prisma.project.create({
      data: {
        ...payload,
        user: { connect: { id: userId } },
      },
    });
return newProject; 
};








export const PostService = {
    createPost,
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    deleteProject,
    updateUser,
    updateProject,
    getAllProject,
    getProjectById,
    projectService
}