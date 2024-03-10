import express, {Response} from 'express'
import {blogRouter} from "../../routes/blog-router";
import {postRouter} from "../../routes/post-router";
import {collectionsList, dbInstance, runDb} from "../../repositories/db";
import dotenv from  'dotenv'

dotenv.config()


export async function runServer(app: express.Application) {
    await runDb()

    const port = process.env.PORT || 5000

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(RouterPaths.blogs, blogRouter)
    app.use(RouterPaths.posts, postRouter)


    app.delete('/testing/all-data', async (_, res: Response) => {
        try {
            const listOfCollections = await dbInstance.listCollections().toArray();
            for(const collection of listOfCollections) {
                await dbInstance.collection(collection.name).deleteMany({});
            }
            res.sendStatus(204);
        } catch (error) {
            console.error("Ошибка при удалении данных: ", error);
            res.status(500).send("Internal Server Error");
        }
        // const listOfCollections = await collectionsList.toArray()
        // for(const collection of listOfCollections) {
        //     await dbInstance.collection(collection.name).deleteMany({})
        // }
        // res.sendStatus(204)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
}
