import express, {Response} from 'express'
import {videoRouter} from "../../store/video/video-router";
import bodyParser from "body-parser";
import {generateVideos} from "../../store/video/video";


export function runServer() {
    const videos = generateVideos(10)
    const app = express()
    const port = 3000
    const bdMiddleware = bodyParser({})

   app.use(bdMiddleware)
   app.use('/videos', videoRouter)
    app.delete('/testing/all-data', (_, res:Response) => {
        videos.length = 0
        res.status(204)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
