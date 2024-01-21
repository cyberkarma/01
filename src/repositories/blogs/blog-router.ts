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
            res.status(404)
        } else {
            res.send(foundBlog[0])
        }
    })

blogRouter.post('/',
    blogValidationRules(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        try {
            // Добавьте отладочный вывод
            console.log('Request Body:', req.body);

            const newBlog = blogRepository.createBlog(req.body);

            // Добавьте отладочный вывод
            console.log('Created Blog:', newBlog);

            res.status(201).send(newBlog);
        } catch (error) {
            // В случае ошибки добавьте отладочный вывод
            console.error('Error creating blog:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    // const newBlog = blogRepository.createBlog(req.body)
    // res.status(201).send(newBlog)
})

blogRouter.put('/:id',
    blogValidationRules(), inputValidationMiddleware,
    (req: Request, res: Response) => {
    const {id} = req.params;
    const newBlog = blogRepository.updateBlog(id, req.body)
        res.status(204).send(newBlog)
    })

blogRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = blogRepository.deleteBlog(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})