import {IPostIM, IPostVM} from "../../post";
import {postsCollection} from "../db";


export const postsRepository = {
    async getPosts(title: string | undefined | null) {
        let searchKey = {}
        if (title) searchKey = {blogId: title};
        if(title) {
            return postsCollection.find(searchKey).toArray()
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
        const genId = Math.floor(Math.random() * 100).toString()
        const newPost: IPostVM = {
            id: genId,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: '',
            createdAt: new Date(),
        }
        await postsCollection.insertOne(newPost)

        return postsCollection.findOne({id: genId})
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