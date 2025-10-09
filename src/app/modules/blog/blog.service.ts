import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";


interface UpdatePostPayload {
  id: number;
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  views?: number;
  isFeatured?: boolean;
}



const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;
}

const updatePost = async (payload: UpdatePostPayload): Promise<Post> => {
  const { id, ...data } = payload;

    // Build a Prisma-compatible update object and only include fields that are defined.
    const prismaData: Prisma.PostUpdateInput = {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        ...(data.views !== undefined && { views: data.views }),
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

const getPostById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return await tx.post.findUnique({
            where: { id },
            include: { author: true },
        });
    })
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};


export const PostService = {
    createPost,
    updatePost,
    getAllPosts,
    getPostById,
    deletePost
}