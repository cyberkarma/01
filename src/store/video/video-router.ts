import {Request, Response, Router} from "express";
import {generateRandomResolution, generateVideos, IVideo} from "./video";
import {validateVideo} from "../../utils/inputvalidation";
import {videoRepository} from "./video-repo";


export const videos:IVideo[] = []

export const videoRouter = Router({})


//Post
videoRouter.post('/', (req: Request, res: Response) => {
    const video = req.body
    const errors = validateVideo(video)
    if (!video || errors.length) {
        res.sendStatus(400).send({
            errorsMessages: errors
        })
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
    let video = videos.find((v => v.id === +req.params.id))
    if (video) {
        res.sendStatus(200).send(video)
    } else {
        res.sendStatus(404)
    }

})

//Delete
videoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

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

    const foundVideo = videos.find((v) => v.id === +id);
    if (!foundVideo) {
        res.status(404).json({message: `Video with id ${id} not found`});
        return;
    }

    // Обновляем свойства видео, только если они присутствуют в req.body
    if (video.title) {
        foundVideo.title = video.title;
    }
    if (video.author) {
        foundVideo.author = video.author;
    }
    if (video.availableResolutions) {
        foundVideo.availableResolutions = video.availableResolutions;
    }
    if (video.canBeDownloaded !== undefined) {
        foundVideo.canBeDownloaded = video.canBeDownloaded;
    }
    if (video.minAgeRestriction !== undefined) {
        foundVideo.minAgeRestriction = video.minAgeRestriction;
    }
    if (video.publicationDate) {
        foundVideo.publicationDate = video.publicationDate;
    }
    res.status(204).send(foundVideo)
})
