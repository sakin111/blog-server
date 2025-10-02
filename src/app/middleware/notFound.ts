
import httpStatus from "http-status-codes"
import { Response } from "express"

const notFound = (res: Response) =>{

    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route not found"

    })

}

export default notFound