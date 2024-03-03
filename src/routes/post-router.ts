import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts/post-in-mongo-db-repo";
import {
    inputValidationMiddleware,
    postPostValidationRules,
    postValidationRules
} from "../middlewares/input-validation-middleware";
import {basicAuth} from "../middlewares/authorization-middleware";
import {preparePostResponse} from "../post";

export const postRouter = Router({})

postRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts = await postsRepository.getPosts(req.query.title?.toString())
    const formattedPosts = foundPosts.map(el => {
        return preparePostResponse(el)
    })
    res.send(formattedPosts)
})

postRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost = await postsRepository.getPostById(req.params.id)
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
    const newPost = await postsRepository.createPost(req.body)
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
    const updateResult = await postsRepository.updatePost(id, req.body);
    if(!updateResult) {
        res.status(404).send()
    } else {
        res.status(204).send()
    }
})

postRouter.delete('/:id',
    basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await postsRepository.deletePost(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})