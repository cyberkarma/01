import {Request, Response, Router} from "express";
import {postsRepository} from "./post-repo";

export const postRouter = Router({})

postRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.getPosts(req.query.title?.toString())
    res.send(foundPosts)
})