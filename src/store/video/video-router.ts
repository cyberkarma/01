import {Request, Response, Router} from "express";
import {generateRandomResolution, generateVideos, IVideo} from "./video";


const videos = generateVideos(10)

export const videoRouter = Router({})


//Post
videoRouter.post('/', (req: Request, res: Response) => {
    const video: IVideo = req.body;
    if (!video || !video.title.trim() || video.title.length > 40) {
        res.status(400).send({
            errorsMessage: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
        })
        return
    }
    const newVideo = {
        author: "Artem",
        availableResolution: generateRandomResolution(),
        canBeDownloaded: false,
        createAt: new Date(),
        id: +(new Date()),
        publicationDate: new Date(),
        title: req.body.title
    }
    videos.push(newVideo)
// console.log("NEW VIDEO", typeof JSON.stringify(newVideo))
    res.set('Content-Type', 'text/plain');
    res.status(201).send(newVideo)

})

//Read
videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})

//ReadById
videoRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find((v => v.id === +req.params.id))
    if (video) {
        res.set('Content-Type', 'text/plain');
        res.status(204).send(video)
    } else {
        res.send(404)
    }

})

//Delete
videoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const video: IVideo = req.body;
    if (!video || !video.title.trim() || video.title.length > 40) {
        res.status(400).send({
            errorsMessage: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
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
    if (video.availableResolution) {
        foundVideo.availableResolution = video.availableResolution;
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
