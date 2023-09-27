import express, {Response} from 'express'
import {videoRouter, videos} from "../../store/video/video-router";
import bodyParser from "body-parser";
import {generateVideos} from "../../store/video/video";


export function runServer(app: express.Application) {
    // const videos = generateVideos(10)

    const port = 3000
    const bdMiddleware = bodyParser({})

   app.use(bdMiddleware)
   app.use(RouterPaths.videos, videoRouter)
    app.delete('/testing/all-data', (_, res:Response) => {
        videos.length = 0
        res.sendStatus(204)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

export const RouterPaths = {
    videos: '/videos',
}
