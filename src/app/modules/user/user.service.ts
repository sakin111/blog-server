
import { prisma } from "../../../config/db";




export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {email: userId},
    select: {
      id: true,
      name: true,
      email: true,
      role: true,

      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    data: user,
  };
};







export const UserService = {
   getMeService,
}