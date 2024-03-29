import {blogsCollection} from "../db";

export const blogQueryRepository = {
    async getBlogs(
        title: string | undefined | null,
        pageSize: number,
        pageNumber: number,
        sortDirection: string,
        sortBy: string,
        searchNameTerm: string,
    ) {
        let searchKey = {};
        let sortKey = {};

        let sortDirectionInner: number;
        if (searchNameTerm) searchKey = {name: {$regex: searchNameTerm,$options:"i"}};

        if (sortDirection === "desc") sortDirectionInner = -1;
        else sortDirectionInner = 1;


        if (sortBy === "description") sortKey = {description: sortDirectionInner};
        else if (sortBy === "websiteUrl") sortKey = {websiteUrl: sortDirectionInner};
        else if (sortBy === "name") sortKey = {name: sortDirectionInner};
        else if (sortBy === "isMembership") sortKey = {isMembership: sortDirectionInner};
        else sortKey = {createdAt: sortDirectionInner};


        if(title) {
           console.log('total count', blogsCollection.countDocuments(searchKey))
            return {
                blogs: await blogsCollection
                    // .find({title: {$regex: title}})
                    // .sort({sortParam: sortDirection === 'desc' ? -1 : 1})
                    .find(searchKey)
                    .sort(sortKey)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await blogsCollection.countDocuments(searchKey)
            }
        } else {
            return {
                blogs: await blogsCollection
                    // .find({})
                    // .sort({sortParam: sortDirection === 'desc' ? -1 : 1})
                    .find(searchKey)
                    .sort(sortKey)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await blogsCollection.countDocuments(searchKey),
            }
        }
    },

    async getBlogsById(id: string) {
        return await blogsCollection.findOne({id: id})
    },
}