
import { NextFunction, Request, Response } from "express";


type CatchAsyncHandler = (req:Request,res:Response, next:NextFunction) => Promise<void>

export const catchAsync = (fn:CatchAsyncHandler) => (req:Request,res:Response, next:NextFunction) =>{
    Promise.resolve(fn(req,res,next)).catch((error : any) =>{
        console.log(error)
        next()
    })
}