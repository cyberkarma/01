import {blogsCollection} from "../db";

export const blogQueryRepository = {
    async getBlogs(title: string | undefined | null, pageSize: number, pageNumber: number, sortDirection: string, sortBy: string) {
        let sortKey = {};
        let sortDirectionInner: number;

        if (sortDirection === "desc") sortDirectionInner = -1;
        else sortDirectionInner = 1;


        if (sortBy === "description") sortKey = {description: sortDirectionInner};
        else if (sortBy === "websiteUrl") sortKey = {websiteUrl: sortDirectionInner};
        else if (sortBy === "name") sortKey = {name: sortDirectionInner};
        else if (sortBy === "isMembership") sortKey = {isMembership: sortDirectionInner};
        else sortKey = {createdAt: sortDirectionInner};


        if(title) {
           console.log('total count', blogsCollection.countDocuments())
            return {
                blogs: await blogsCollection
                    .find({title: {$regex: title}})
                    // .sort({sortParam: sortDirection === 'desc' ? -1 : 1})
                    .sort(sortKey)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await blogsCollection.countDocuments({title: {$regex: title}})
            }
        } else {
            return {
                blogs: await blogsCollection
                    .find({})
                    // .sort({sortParam: sortDirection === 'desc' ? -1 : 1})
                    .sort(sortKey)
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