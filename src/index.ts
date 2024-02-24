import express, { Express, Response } from 'express';
import { blogRouter } from './repositories/blogs/blog-router';
import { postRouter } from './repositories/posts/post-router';
import { runDb } from './repositories/db';
import dotenv from 'dotenv';

dotenv.config();

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
};

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RouterPaths.blogs, blogRouter);
app.use(RouterPaths.posts, postRouter);

app.delete('/testing/all-data', (_, res: Response) => {
    res.sendStatus(204);
});

runDb().catch(console.error);

export default app;

// import {runServer} from "./server/runserver/runserver";
// import express, {Response} from 'express'
//
// import dotenv from  'dotenv'
// import {blogRouter} from "./repositories/blogs/blog-router";
// import {postRouter} from "./repositories/posts/post-router";
// import {runDb} from "./repositories/db";
//
// dotenv.config()
//
// export const RouterPaths = {
//     blogs: '/blogs',
//     posts: '/posts',
// }
//
//
//
//
// export const app = express()
// const port = process.env.PORT || 5000
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(RouterPaths.blogs, blogRouter)
// app.use(RouterPaths.posts, postRouter)
//
//
// app.delete('/testing/all-data', (_, res: Response) => {
//     res.sendStatus(204)
// })
// const startApp = async () => {
//   await runDb()
//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// }
// startApp()

// runServer(app)