
import { NextFunction, Request, Response } from "express"
import { envVar } from "../config/env"



export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


  let statusCode = 500
  let message = `something went wrong ${err.message}from global error`

  let errorSource: any = []


 if (err instanceof Error) {
    statusCode = 500
    message = err.message
  }

res.status(statusCode).json({
  success: false,
  message,
  errorSource,
  err: envVar.NODE_ENV === "development" ? err : undefined,
  stack: envVar.NODE_ENV === "development" ? err.stack : undefined
});

}