import {blogsCollection} from "../db";

export const blogQueryRepository = {
    async getBlogs(title: string | undefined | null, pageSize: number, pageNumber: number, sortDirection: string) {
        if(title) {
           console.log('total count', blogsCollection.countDocuments())
            return {
                blogs: await blogsCollection
                    .find({title: {$regex: title}})
                    .sort({createdAt: sortDirection === 'desc' ? -1 : 1})
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await blogsCollection.countDocuments({title: {$regex: title}})
            }
        } else {
            return {
                blogs: await blogsCollection
                    .find({})
                    .sort({createdAt: sortDirection === 'desc' ? -1 : 1})
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await blogsCollection.countDocuments({}),
            }
        }
    },

    async getBlogsById(id: string) {
        return await blogsCollection.findOne({id: id})
    },
}