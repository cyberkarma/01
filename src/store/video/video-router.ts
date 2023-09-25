import {Request, Response, Router} from "express";
import {generateRandomResolution, generateVideos} from "./video";


const videos = generateVideos(10)

export const videoRouter = Router({})


//Post
videoRouter.post('/', (req: Request, res: Response) => {
    console.log("PRIVET")
    const newVideo = {
        author: "Artem",
        availableResolution: generateRandomResolution(),
        canBeDownloaded: false,
        createAt: new Date(),
        id: +(new Date()),
        publicationDate: new Date(),
        title: req.body.title
    }
    console.log(newVideo)
    videos.push(newVideo)

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
        res.send(video)
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

