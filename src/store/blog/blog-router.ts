import {Request, Response, Router} from "express";
import {blogRepository} from "./blog-repo";

export const blogRouter = Router({})



//GET
blogRouter.get('/', (req:Request, res:Response) => {
    const foundBlogs = blogRepository.findBlogs()
    res.send(foundBlogs)
})

//GetById
blogRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlog = blogRepository.findBlogs(req.params.id)
    if(foundBlog) {
        res.send(foundBlog)
    }
})

//POST
blogRouter.post('/', (req: Request, res: Response) => {
    const blog = req.body
    const newBlog = blogRepository.createBlog(blog)
    res.sendStatus(201).send(newBlog)
})