import {Request, Response, Router} from "express";
import {IVideo} from "./video";
import {validateVideo} from "../../utils/inputvalidation";
import {videoRepository} from "./video-repo";
import { body, validationResult, check } from "express-validator";


export const videos:IVideo[] = []

export const videoRouter = Router({})


//Post
videoRouter.post('/',
    check('title').isLength({min: 3, max: 40}).withMessage('BLABLABLABLA'),
    (req: Request, res: Response) => {

    const errors = validationResult(req)
        console.log(errors)


    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }
    const newVideo = videoRepository.createVideo(req.body)

    res.sendStatus(201).send(newVideo)

})

//Read
videoRouter.get('/', (req: Request, res: Response) => {

    const foundVideos = videoRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})

//ReadById
videoRouter.get('/:id', (req: Request, res: Response) => {
    // let video = videos.find((v => v.id === +req.params.id))
    const video = videoRepository.findVideos(req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.sendStatus(404)
    }

})

//Delete
videoRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = videoRepository.deleteVideo(+req.params.id)
    if(isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

//Update
videoRouter.put('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const video: IVideo = req.body;
    const errors = validateVideo(video)
    if (!video || errors.length) {
        res.sendStatus(400).send({
            errorsMessages: errors
        })
        return
    }
    const foundVideo = videoRepository.updateVideo(+id, video)


    res.status(204).send(foundVideo)
})
