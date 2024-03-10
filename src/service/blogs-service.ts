import {IBlogIM, IBlogVM} from "../blog";
import {blogRepository} from "../repositories/blogs/blog-in-mongo-db-repo";
import {blogQueryRepository} from "../repositories/blogs/blog-query-in-mongo-repo";


export const blogsService = {

    async createBlog(blog: IBlogIM) {
        const genId = Math.floor(Math.random() * 100).toString()
        const newBlog: IBlogVM = {
            id: genId,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: new Date(),
        }
        await blogRepository.createBlog(newBlog)
        return blogQueryRepository.getBlogsById(genId)
    },

    async updateBlog(id: string, blog: IBlogIM) {
        return await  blogRepository.updateBlog(id, blog)
    },

    async deleteBlog(id: string) {
        return await blogRepository.deleteBlog(id)
    },
}