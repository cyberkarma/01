import {Request, Response, Router} from "express";
import {postsRepository} from "./post-repo";
import {
    inputValidationMiddleware,
    postPostValidationRules,
    postValidationRules
} from "../../middlewares/input-validation-middleware";
import {basicAuth} from "../../middlewares/authorization-middleware";

export const postRouter = Router({})

postRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.getPosts(req.query.title?.toString())
    res.send(foundPosts)
})

postRouter.get('/:id', (req: Request, res: Response) => {
    const foundPost = postsRepository.getPosts(req.params.id)
    if(!foundPost.length) {
        res.status(404).send()
    } else {
        res.send(foundPost[0])
    }
})

postRouter.post('/',
    basicAuth,
    postValidationRules(),
    postPostValidationRules(),
    inputValidationMiddleware,
    (req: Request, res:Response) => {
    const newPost = postsRepository.createPost(req.body)
    console.log('Created Post:', newPost);
    res.status(201).send(newPost)
})

postRouter.put('/:id',
    basicAuth,
    postValidationRules(),
    postPostValidationRules(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const {id} = req.params;
    const updateResult = postsRepository.updatePost(id, req.body);
    if(!updateResult) {
        res.status(404).send()
    } else {
        res.status(204).send()
    }
})

postRouter.delete('/:id',basicAuth, (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(req.params.id)
    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})