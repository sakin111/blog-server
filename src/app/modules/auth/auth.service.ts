import AppError from "../../ErrorBuilder/AppError";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { createNewAccessToken, createUserToken } from "../../utils/userToken";
import { User } from "@prisma/client";
import { prisma } from "../../../config/db";




const credentialsLogin = async (payload: Partial<User>) => {
    
      if (!payload || !payload.email || !payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");
  }
    const { email, password } = payload;

    const isUserExist = await prisma.user.findUnique({where:{email}})

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const userTokens = createUserToken(isUserExist)

    const { password: pass, ...rest } = isUserExist

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }

}


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}


export const authService = {
credentialsLogin,
getNewAccessToken
}
