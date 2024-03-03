 import {IBlogIM, IBlogVM} from "../../blog";
 import {blogsCollection, client} from "../db";


export const blogRepository = {

    async createBlog(blog: IBlogVM) {
        return  blogsCollection.insertOne(blog)
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