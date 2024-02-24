import {Request, Response, Router} from "express";
import {blogValidationRules, inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {basicAuth} from "../../middlewares/authorization-middleware";
import {blogRepository} from "./blog-in-mongo-db-repo";
// import {blogRepository} from "./blog-in-memory-repo";


export const blogRouter = Router({})

blogRouter.get('/',
    async (req: Request, res: Response) => {
        const foundBlogs = await blogRepository.getBlogs(req.query.name?.toString())
        res.send(foundBlogs)
})

blogRouter.get('/:id',
    async (req: Request, res: Response) => {
        const foundBlog = await blogRepository.getBlogsById(req.params.id)
        if(!foundBlog) {
            console.log('404')
            res.status(404).send()
        } else {
            res.send(foundBlog)
        }
    })

blogRouter.post('/',
    // basicAuth,
    blogValidationRules(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const newBlog = await blogRepository.createBlog(req.body);
            res.status(201).send(newBlog);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
})

blogRouter.put('/:id',
    // basicAuth,
    blogValidationRules(), inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const {id} = req.params;
        const updateResult = await blogRepository.updateBlog(id, req.body);
        if (!updateResult) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    })

blogRouter.delete('/:id',
    // basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await blogRepository.deleteBlog(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})