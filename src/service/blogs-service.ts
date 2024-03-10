import {IBlogIM, IBlogVM} from "../blog";
import {blogRepository} from "../repositories/blogs/blog-in-mongo-db-repo";
import {blogQueryRepository} from "../repositories/blogs/blog-query-in-mongo-repo";
import {UUID} from "mongodb";


export const blogsService = {

    async createBlog(blog: IBlogIM) {
        const genId =  new UUID()
        const newBlog: IBlogVM = {
            id: genId.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: new Date(),
        }
        await blogRepository.createBlog(newBlog)
        return blogQueryRepository.getBlogsById(genId.toString())
    },

    async updateBlog(id: string, blog: IBlogIM) {
        return await  blogRepository.updateBlog(id, blog)
    },

    async deleteBlog(id: string) {
        return await blogRepository.deleteBlog(id)
    },
}