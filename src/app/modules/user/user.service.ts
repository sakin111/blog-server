
import { prisma } from "../../../config/db";




// service
export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {email: userId }, 
  });
  console.log(user)

  if (!user) return { data: null };

  const { password, ...userInfo } = user;
  return { data: userInfo };
};








export const UserService = {
   getMeService,
}