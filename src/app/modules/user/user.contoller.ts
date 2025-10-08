import { Request, Response } from "express";

import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes"
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

const  getMe = catchAsync(async(req: Request, res: Response) =>{
        const userId = req.user.email;

        const result = await UserService.getMeService(userId)
        sendResponse(res,{
           success: true,
           statusCode: httpStatus.OK,
           message: "user retrieve successfully",
           data: result.data,   
            
         })
})


export const UserController = {
   getMe
}