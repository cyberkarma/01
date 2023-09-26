import {Request, Response, Router} from "express";
import {generateRandomResolution, generateVideos, IVideo} from "./video";
import {validateVideo} from "../../utils/inputvalidation";


const videos = generateVideos(10)

export const videoRouter = Router({})


//Post
videoRouter.post('/', (req: Request, res: Response) => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const video: IVideo = req.body;
    if (!video || !video.title || !video.title.trim() || video.title.length > 40) {
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
        author: video.author,
        availableResolutions: video.availableResolutions,
        canBeDownloaded: false,
        createdAt: new Date().toISOString(),
        id: +(new Date()),
        publicationDate: currentDate.toISOString(),
        title: video.title,
        minAgeRestriction: video.minAgeRestriction || null
    }
    videos.push(newVideo)
// console.log("NEW VIDEO", typeof JSON.stringify(newVideo))
    console.log("NEW", video.availableResolutions)
    res.status(201).set('Content-Type', 'text/plain').send(newVideo)

})

//Read
videoRouter.get('/', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.send(videos)
})

//ReadById
videoRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find((v => v.id === +req.params.id))
    if (video) {
        res.set('Content-Type', 'text/plain');
        res.status(200).send(video)
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
    const errors = validateVideo(video)
    if (!video || errors.length) {
        res.status(400).send({
            errorsMessage: errors
        })
    }

    // if ((!video || !video.title || !video.title.trim() || video.title.length > 40) && typeof video.canBeDownloaded != "boolean") {
    //     res.status(400).send({
    //          errorsMessage: [{message:"Incorrect title", field:"title"},{
    //             message:"Incorrect canBeDownloaded",
    //             field:"canBeDownloaded"
    //         }]
    //     })
    //     return
    //     res.status(400).send({
    //         errorsMessages: [{ message: "blabla title", field: "title" }, { message: "blabla CBD", field: "canBeDownloaded" }]
    //     })
    //     return
    // }

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
