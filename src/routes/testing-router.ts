import {Router, Request, Response} from "express";
import {blogsCollection, postsCollection} from "../repositories/db";



export const testingRouter = Router()

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
    console.log('before')
    const result2 = await blogsCollection.find({})
    console.log('before', result2)
    await postsCollection.deleteMany({});
    await blogsCollection.deleteMany({});
   const result = await blogsCollection.find({})
    console.log('after', result)
    res.sendStatus(204);
})