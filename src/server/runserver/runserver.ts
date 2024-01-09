import express, {Response} from 'express'
import {videoRouter, videos} from "../../repositories/video/video-router";
import {blogRouter} from "../../repositories/blogs/blog-router";


export function runServer(app: express.Application) {
    const port = 3000

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use(RouterPaths.videos, videoRouter)
    app.use(RouterPaths.blogs, blogRouter)
    app.delete('/testing/all-data', (_, res: Response) => {
        videos.length = 0
        res.sendStatus(204)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

export const RouterPaths = {
    videos: '/videos',
    blogs: '/blogs'
}
