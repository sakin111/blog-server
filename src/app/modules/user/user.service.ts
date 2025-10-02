
import { prisma } from "../../../config/db";




const getMeService = async(userId: string) =>{
    const userInfo = await prisma.user.findUnique({
        where:{
            email:email
        },
            select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    })
    return {
       data: userInfo
    }
}






export const UserService = {
   getMeService,
   credentialsLogin,
   getNewAccessToken
   
}