 import {IBlogIM, IBlogVM} from "./blog";
 import {blogsCollection, client} from "../db";


export const blogRepository = {

   async getBlogs(title: string | undefined | null) {
       if(title) {
           return blogsCollection.find({title: {$regex: title}}).toArray()
       } else {
           return blogsCollection.find({}).toArray()
       }
       // const filter: any = {}
       // if(title) {
       //     filter.title = {$regex: title}
       // }
       //
       // return blogsCollection.find(filter).toArray()
    },

    async getBlogsById(id: string) {
        const blog = await blogsCollection.findOne({id: id})
        if(blog) {
          return  blog
        } else {
          return null
        }
    },

    async createBlog(blog: IBlogIM) {
        const newBlog: IBlogVM = {
            id: blog.id || Math.floor(Math.random() * 100).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: new Date(),
            _id: undefined,
        }
        await blogsCollection.insertOne(newBlog)

        return newBlog
    },

    async updateBlog(id: string, blog: IBlogIM) {
       const result = await blogsCollection
           .updateOne({id: id}, {$set: blog})

        return result.matchedCount === 1
    },

   async deleteBlog(id: string) {
       const result = await blogsCollection.deleteOne({id: id})

       return result.deletedCount === 1
    },
}