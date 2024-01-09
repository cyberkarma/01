import {generateBlogs, IBlogIM, IBlogVM} from "./blog";

export const blogs = generateBlogs(5);
export const blogRepository = {

    getBlogs(id: string | undefined | null) {
        if(id) {
            console.log('Here')
            return blogs.filter(b => b.id.indexOf(id) > -1)
        } else {
            return blogs
        }
    },

    createBlog(blog: IBlogIM) {
        const newBlog: IBlogVM = {
            id: Math.floor(Math.random() * 100).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogs.push(newBlog)
        console.log("POST:", newBlog)
        return newBlog
    }
}