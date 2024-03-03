import {Request, Response, Router} from "express";
import {blogValidationRules, inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {basicAuth} from "../middlewares/authorization-middleware";
import {prepareBlogResponse} from "../blog";
import {blogsService} from "../service/blogs-service";
import {postsRepository} from "../repositories/posts/post-in-mongo-db-repo";
import {preparePostResponse} from "../post";


export const blogRouter = Router({})

blogRouter.get('/',
    async (req: Request, res: Response) => {
        const query = req.query

        const sortData = {
            sortBy: query.sortBy || "createdAt",
            sortDirection: query.sortDirection || "desc",
            pageNumber: query.pageNumber || 1,
            pageSize: query.pageSize || 10
        }

        const foundBlogs = await blogsService.getBlogs(req.query.name?.toString())
        const formattedBlogs = foundBlogs.map(el => {
            return prepareBlogResponse(el)
        })
        res.send({
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items: formattedBlogs})
})

blogRouter.get('/:id',
    async (req: Request, res: Response) => {
        const foundBlog = await blogsService.getBlogsById(req.params.id)

        if(!foundBlog) {
            console.log('404')
            res.status(404).send()
        } else {
            const responseBlog = prepareBlogResponse(foundBlog)
            res.send(responseBlog)
        }
    })
blogRouter.get('/:id/posts',
    async (req: Request, res: Response) => {
        const foundPosts = await postsRepository.getPosts(req.params.id)
        if(!foundPosts) {
            res.status(404).send()
        } else {
            const responsePosts = foundPosts.map((el) => {
                return preparePostResponse(el)
            })
            res.send(responsePosts)
        }
    })

blogRouter.post('/',
    // basicAuth,
    blogValidationRules(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const newBlog = await blogsService.createBlog(req.body);
            if(newBlog) {
                const responseBlog = prepareBlogResponse(newBlog)
                res.status(201).send(responseBlog);
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
})

blogRouter.put('/:id',
    // basicAuth,
    blogValidationRules(), inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const {id} = req.params;
        const updateResult = await blogsService.updateBlog(id, req.body);
        if (!updateResult) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    })

blogRouter.delete('/:id',
    // basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteBlog(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})