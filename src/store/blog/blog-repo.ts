import {generateBlogs, IBlog} from "./blog";

export const blogs: IBlog[] = generateBlogs(5)
// export const blogs: IBlog[] = []

export const blogRepository = {
    findBlogs(id?: string) {
        if(id) {
            return blogs.find(b => b.id === id)

        }
        return blogs
    },


    createBlog(blog: IBlog) {
        const newBlog: IBlog = {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl

        }
        blogs.push(newBlog)
        return newBlog
    }
}