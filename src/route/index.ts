import { Router } from "express";
import { blog } from "../modules/blog/blog.router";
import { user } from "../modules/user/user.routes";


export const router = Router()

const routesModule = [
    {
        path:"/blog",
        route: blog
    },
    {
        path:"/user",
        route: user
    }
]

routesModule.forEach((route) =>{
    router.use(route.path, route.route)
})