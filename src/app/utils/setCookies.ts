import { Response } from "express"
import { cookieHandler } from "./cookieHandler"



export interface AuthToken {
    accessToken?: string,
    refreshToken?: string
}

export const  setAuthCookies = (res: Response, tokenInfo: AuthToken) =>{
    if(tokenInfo.accessToken){
        res.cookie("accessToken",tokenInfo.accessToken,cookieHandler())
    }
     if (tokenInfo.refreshToken) {
      res.cookie("refreshToken",tokenInfo.refreshToken,cookieHandler())
   }
}