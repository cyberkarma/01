import {Request, Response, Router} from "express";
import {blogRepository} from "./blog-repo";
import {blogValidationRules, inputValidationMiddleware} from "../../middlewares/input-validation-middleware";


export const blogRouter = Router({})

blogRouter.get('/',
    (req: Request, res: Response) => {
    const foundBlogs = blogRepository.getBlogs(req.query.name?.toString())
    res.send(foundBlogs)
})

blogRouter.get('/:id',
    (req: Request, res: Response) => {
        const foundBlog = blogRepository.getBlogs(req.params.id)
        if(!foundBlog.length) {
            res.sendStatus(404)
        } else {
            res.send(foundBlog)
        }
    })

blogRouter.post('/',
    blogValidationRules(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newBlog = blogRepository.createBlog(req.body)
    res.sendStatus(201).send(newBlog)
})

blogRouter.put('/:id',
    blogValidationRules(), inputValidationMiddleware,
    (req: Request, res: Response) => {
    const {id} = req.params;
    const newBlog = blogRepository.updateBlog(id, req.body)
        res.sendStatus(204).send(newBlog)
    })

blogRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = blogRepository.deleteBlog(req.params.id)
    if(isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})