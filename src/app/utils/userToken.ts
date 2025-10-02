import { User } from "@prisma/client";
import { generateToken, verifyTokens } from "./jwt";
import { envVar } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/db";
import AppError from "../ErrorBuilder/AppError";
import httpStatus from "http-status-codes"


export const createUserToken = (user: Partial<User>) =>{
  const accessPayload = {
    user: user.id,
    email: user.email,
    role: user.role
  }

  const accessToken = generateToken(accessPayload,envVar.JWT_ACCESS_SECRET,envVar.JWT_ACCESS_EXPIRE)
  const refreshToken= generateToken(accessPayload,envVar.JWT_REFRESH_SECRET,envVar.JWT_REFRESH_EXPIRE)
  return {
    accessToken,
    refreshToken
  }
}

export const createNewAccessToken= async (refreshToken: string) => {

    const verifiedRefreshToken = verifyTokens(refreshToken, envVar.JWT_REFRESH_SECRET) as JwtPayload


    const isUserExist = await prisma.user.findUnique({
      where:{
        email: verifiedRefreshToken.email 
      }
     })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }
    

    const jwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_SECRET, envVar.JWT_ACCESS_EXPIRE)

    return accessToken
}