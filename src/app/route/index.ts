import { Router } from "express";
import { blog } from "../modules/blog/blog.router";
import { user } from "../modules/user/user.routes";
import { authRoute } from "../modules/auth/auth.route";


export const router = Router()

const routesModule = [
    {
        path: "/blog",
        route: blog
    },
    {
        path: "/user",
        route: user
    },
    {
        path: "/auth",
        route: authRoute
    },
]

routesModule.forEach((route) => {
    router.use(route.path, route.route)
})