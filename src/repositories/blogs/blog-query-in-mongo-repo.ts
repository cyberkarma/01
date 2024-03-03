import {blogsCollection} from "../db";

export const blogQueryRepository = {
    async getBlogs(title: string | undefined | null) {
        if(title) {
            return blogsCollection.find({title: {$regex: title}}).toArray()
        } else {
            return blogsCollection.find({}).toArray()
        }
    },

    async getBlogsById(id: string) {
        return await blogsCollection.findOne({id: id})
    },
}