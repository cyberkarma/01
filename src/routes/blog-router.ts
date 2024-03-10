import {Request, Response, Router} from "express";
import {
    BlogPostValidationRules,
    blogValidationRules,
    inputValidationMiddleware,
    postPostValidationRules, postValidationRules
} from "../middlewares/input-validation-middleware";
import {basicAuth} from "../middlewares/authorization-middleware";
import {prepareBlogResponse} from "../blog";
import {blogsService} from "../service/blogs-service";
import {postsRepository} from "../repositories/posts/post-in-mongo-db-repo";
import {preparePostResponse} from "../post";
import {postQueryRepository} from "../repositories/posts/post-query-in-mongo-repo";
import {blogQueryRepository} from "../repositories/blogs/blog-query-in-mongo-repo";
import {postsService} from "../service/posts-service";


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

        const {blogs, totalCount} = await blogQueryRepository
            .getBlogs(
                req.query.name?.toString(),
                +sortData.pageSize,
                +sortData.pageNumber,
                sortData.sortDirection.toString(),
                sortData.sortBy.toString())
        const formattedBlogs = (await blogs).map(el => {
            return prepareBlogResponse(el)
        })
        res.send({
            pagesCount: Math.ceil(totalCount / +sortData.pageSize),
            page: +sortData.pageNumber,
            pageSize: +sortData.pageSize,
            totalCount: totalCount,
            items: formattedBlogs})
})

blogRouter.get('/:id',
    async (req: Request, res: Response) => {
        const foundBlog = await blogQueryRepository.getBlogsById(req.params.id)

        if(!foundBlog) {
            console.log('404')
            res.status(404).send()
        } else {
            const responseBlog = prepareBlogResponse(foundBlog)
            res.send(responseBlog)
        }
    })
blogRouter.get('/:id/posts',
    BlogPostValidationRules(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const query = req.query
        const sortData = {
            sortBy: query.sortBy || "createdAt",
            sortDirection: query.sortDirection || "desc",
            pageNumber: query.pageNumber || 1,
            pageSize: query.pageSize || 10
        }

        const {posts, totalCount} = await postQueryRepository
            .getPosts(
                req.params.id,
                +sortData.pageSize,
                +sortData.pageNumber,
                sortData.sortDirection.toString()
            )
        const foundPosts = await posts
        if(!foundPosts) {
            res.status(404).send()
        } else {
            const responsePosts = foundPosts.map((el) => {
                return preparePostResponse(el)
            })
            res.send({
                pagesCount: Math.ceil(await totalCount / +sortData.pageSize),
                page: +sortData.pageNumber,
                pageSize: +sortData.pageSize,
                totalCount: await totalCount,
                items: responsePosts})
        }
    })

blogRouter.post('/',
    basicAuth,
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

blogRouter.post('/:id/posts',
    basicAuth,
    BlogPostValidationRules(),
    postValidationRules(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const newPost = await postsService.createPost(req.body, req.params.id);
            if(newPost) {
                const responsePost = preparePostResponse(newPost)
                res.status(201).send(responsePost);
            } else {
                res.sendStatus(404)
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    })

blogRouter.put('/:id',
    basicAuth,
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
    basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteBlog(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})