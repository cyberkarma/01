import {blogsCollection} from "../db";

export const blogQueryRepository = {
    async getBlogs(title: string | undefined | null) {
        if(title) {
           console.log('total count', blogsCollection.countDocuments())
            return {
                blogs: await blogsCollection.find({title: {$regex: title}}).toArray(),
                totalCount: await blogsCollection.countDocuments({title: {$regex: title}})
            }
        } else {
            return {
                blogs: await blogsCollection.find({}).toArray(),
                totalCount: await blogsCollection.countDocuments({}),
            }
        }
    },

    async getBlogsById(id: string) {
        return await blogsCollection.findOne({id: id})
    },
}