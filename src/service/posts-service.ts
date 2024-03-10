import {IPostIM, IPostVM} from "../post";
import {postQueryRepository} from "../repositories/posts/post-query-in-mongo-repo";
import {postsRepository} from "../repositories/posts/post-in-mongo-db-repo";
import {ObjectId, UUID} from "mongodb";

export const postsService = {

    async createPost(post: IPostIM, blogId?: string) {
        const genId = new UUID()
        const newPost: IPostVM = {
            id: genId.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogId ? blogId : post.blogId,
            blogName: '',
            createdAt: new Date(),
        }
        await postsRepository.createPost(newPost)
        console.log('created post', newPost)
        // const post1 = await postQueryRepository.getPostById(genId)
        // console.log('post1',post1)

        return await postQueryRepository.getPostById(genId.toString())
    },

    async updatePost(id: string, post: IPostIM) {
        return await postsRepository.updatePost(id, post)
    },
    async deletePost(id: string) {
        return await postsRepository.deletePost(id)
    }
}