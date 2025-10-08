import { Response } from "express";
import { envVar } from "../config/env";


export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: envVar.NODE_ENV === "production" ? true : false,
            sameSite: envVar.NODE_ENV === "production" ? "none" : "lax",
        });
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: envVar.NODE_ENV === "production" ? true : false,
            sameSite: envVar.NODE_ENV === "production" ? "none" : "lax",
        });
    }
}





