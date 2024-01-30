import {generateBlogs, IBlogIM, IBlogVM} from "./blog";

export const blogs = generateBlogs(5);
// export const blogs:IBlogVM[] = []
export const blogRepository = {

    getBlogs(id: string | undefined | null) {
        if(id && blogs.length) {
            const foundBlogs = blogs.filter(b => b.id === id);
            return foundBlogs.length > 0 ? foundBlogs : [];
        } else {
            return blogs
        }
    },

    createBlog(blog: IBlogIM) {
        const newBlog: IBlogVM = {
            id: blog.id || Math.floor(Math.random() * 100).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id: string, blog: IBlogIM) {
        const foundBlog = blogs.find((b) => b.id === id);
        if (!foundBlog) {
            return;
        }
        foundBlog.name = blog.name
        foundBlog.description = blog.description
        foundBlog.websiteUrl = blog.websiteUrl
        return foundBlog

    },

    deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false

    },
}