import express from 'express'
import {videoRouter} from "../../store/video/video-router";
import bodyParser from "body-parser";


export function runServer() {
    const app = express()
    const port = 3000
    const bdMiddleware = bodyParser({})

   app.use(bdMiddleware)
   app.use('/videos', videoRouter)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
