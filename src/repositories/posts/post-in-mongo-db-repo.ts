import {IPostIM, IPostVM} from "./post";
import {postsCollection} from "../db";


export const postsRepository = {
    async getPosts(title: string | undefined | null) {
        if(title) {
            return postsCollection.find({title: {$regex: title}}).toArray()
        } else {
            return postsCollection.find({}).toArray()
        }
    },
    async getPostById(id: string) {
        const post = await postsCollection.findOne({id: id })
        if(post) {
            return post
        } else {
            return null
        }
    },

    async createPost(post: IPostIM) {
        const newPost: IPostVM = {
            id: post.id || Math.floor(Math.random() * 100).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName || '',
            createdAt: new Date()
        }
        await postsCollection.insertOne(newPost)

        return newPost
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