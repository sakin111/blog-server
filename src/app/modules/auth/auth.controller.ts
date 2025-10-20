import httpStatus from "http-status-codes"
import { authService } from "./auth.service";
import { createUserToken } from "../../utils/userToken";

import { sendResponse } from "../../utils/SendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../../ErrorBuilder/AppError";
import { setAuthCookie } from "../../utils/setCookies";




const CredentialLogin = catchAsync(async (req: Request, res: Response) => {
    const loginInfo = await authService.credentialsLogin(req.body)
    const user = loginInfo.user;
    const userToken = createUserToken(user);
  
    setAuthCookie(res, userToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user login successful",
      data: {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: user
      }
    });
  });


const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "can not found refresh token")
  }
  const tokenInfo = await authService.getNewAccessToken(refreshToken)

  setAuthCookie(res, tokenInfo)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user retrieved successfully",
    data: tokenInfo


  })
})


const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/" 
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/" 
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
    })
})

export const authController = {
  CredentialLogin,
  getNewAccessToken,
  logout,
}