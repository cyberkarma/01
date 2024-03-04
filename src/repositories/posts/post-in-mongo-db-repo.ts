import {IPostIM, IPostVM} from "../../post";
import {postsCollection} from "../db";


export const postsRepository = {

    async createPost(post: IPostVM) {
        // const genId = Math.floor(Math.random() * 100).toString()
        const newPost: IPostVM = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: '',
            createdAt: new Date(),
        }
        await postsCollection.insertOne(newPost)

        // return await postsCollection.findOne({id: genId})
    },

    async updatePost(id: string, post: IPostIM) {
        const result = await postsCollection
            .updateOne({id:id}, {$set: post})

        return result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    }
}