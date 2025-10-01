import { Request, Response } from "express";


const createUser = async (req: Request, res: Response) => {
    try {
        const = 
        const result = await 
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}



export const UserController = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}