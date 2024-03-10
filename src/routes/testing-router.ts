import {Router, Request, Response} from "express";
import {blogsCollection, postsCollection} from "../repositories/db";



export const testingRouter = Router()

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({});
    await postsCollection.deleteMany({});
    res.sendStatus(204);
})