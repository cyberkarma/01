import {Request, Response, Router, NextFunction} from "express";
import {videoRepository} from "../video/video-repo";
import {blogRepository, blogs} from "./blog-repo";
import { body, validationResult, check } from "express-validator";


export const blogRouter = Router({})
const blogInputValidatin =

blogRouter.get('/',
    (req: Request, res: Response) => {
    const foundBlogs = blogRepository.getBlogs(req.query.name?.toString())
    res.send(foundBlogs)
})

blogRouter.get('/:id',
    (req: Request, res: Response) => {
    console.log(req.params.id, "IDIDI")
        const foundBlog = blogRepository.getBlogs(req.params.id)
        res.send(foundBlog)
    })

blogRouter.post('/',
    check('name').trim().notEmpty().isLength({max: 15}),
    check('description').notEmpty().isLength({max: 500}),
    check('websiteUrl').notEmpty().isURL().isLength({max: 100}),
    (req: Request, res: Response) => {
        const errorsMessages = validationResult(req);
        if (!errorsMessages.isEmpty()) {
            res.status(400).json({ errorsMessages: errorsMessages.array() });
        }
    const newBlog = blogRepository.createBlog(req.body)
    res.send(newBlog)
})