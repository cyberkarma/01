import {Router, Request, Response} from "express";
import {blogsCollection, postsCollection, usersCollection} from "../repositories/db";



export const testingRouter = Router()

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
    await postsCollection.deleteMany({});
    await blogsCollection.deleteMany({});
    await usersCollection.deleteMany({});
    res.sendStatus(204);
})