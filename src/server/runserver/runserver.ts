import express, {Response} from 'express'
import {blogRouter} from "../../routes/blog-router";
import {postRouter} from "../../routes/post-router";
import {collectionsList, dbInstance, runDb} from "../../repositories/db";
import dotenv from  'dotenv'
import {testingRouter} from "../../routes/testing-router";
import {usersRouter} from "../../routes/users-router";
import {authRouter} from "../../routes/auth-router";

dotenv.config()


export async function runServer(app: express.Application) {
    await runDb()

    const port = process.env.PORT || 5000

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(RouterPaths.blogs, blogRouter)
    app.use(RouterPaths.posts, postRouter)
    app.use(RouterPaths.testing, testingRouter)
    app.use(RouterPaths.users, usersRouter)
    app.use(RouterPaths.auth, authRouter)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
    testing:'/testing',
    users: '/users',
    auth: '/auth',
}
