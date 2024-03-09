import {Request, Response, Router} from "express";
import {
    inputValidationMiddleware,
    postPostValidationRules,
    postValidationRules
} from "../middlewares/input-validation-middleware";
import {basicAuth} from "../middlewares/authorization-middleware";
import {preparePostResponse} from "../post";
import {postsService} from "../service/posts-service";
import {postQueryRepository} from "../repositories/posts/post-query-in-mongo-repo";

export const postRouter = Router({})

postRouter.get('/', async (req: Request, res: Response) => {
    const query = req.query
    const sortData = {
        sortBy: query.sortBy || "createdAt",
        sortDirection: query.sortDirection || "desc",
        pageNumber: query.pageNumber || 1,
        pageSize: query.pageSize || 10
    }
    const {posts, totalCount} = await postQueryRepository.getPosts(query.title?.toString())
    const formattedPosts = (await posts).map(el => {
        return preparePostResponse(el)
    })
    res.send({
        totalCount: await totalCount,
        pagesCount: Math.ceil(await totalCount / +sortData.pageSize),
        page: sortData.pageNumber,
        pageSize: sortData.pageSize,
        items: formattedPosts
    })
})

postRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost = await postQueryRepository.getPostById(req.params.id)
    if(!foundPost) {
        res.status(404).send()
    } else {
        const responsePost = preparePostResponse(foundPost)
        res.send(responsePost)
    }
})

postRouter.post('/',
    basicAuth,
    postValidationRules(),
    postPostValidationRules(),
    inputValidationMiddleware,
    async (req: Request, res:Response) => {
    const newPost = await postsService.createPost(req.body)
        if(newPost) {
            const responsePost = preparePostResponse(newPost)
            res.status(201).send(responsePost)
        }
})

postRouter.put('/:id',
    basicAuth,
    postValidationRules(),
    postPostValidationRules(),
    inputValidationMiddleware,
   async (req: Request, res: Response) => {
    const {id} = req.params;
    const updateResult = await postsService.updatePost(id, req.body);
    if(!updateResult) {
        res.status(404).send()
    } else {
        res.status(204).send()
    }
})

postRouter.delete('/:id',
    basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePost(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})