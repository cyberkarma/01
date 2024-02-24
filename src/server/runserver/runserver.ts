import express, {Response} from 'express'
import {blogRouter} from "../../repositories/blogs/blog-router";
import {postRouter} from "../../repositories/posts/post-router";
import {runDb} from "../../repositories/db";
import dotenv from  'dotenv'

dotenv.config()


export function runServer(app: express.Application) {
    // await runDb()

    const port = process.env.PORT || 5000

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(RouterPaths.blogs, blogRouter)
    app.use(RouterPaths.posts, postRouter)


    app.delete('/testing/all-data', (_, res: Response) => {
        res.sendStatus(204)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
}
