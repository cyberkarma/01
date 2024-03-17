import {usersCollection} from "../db";

export const usersQueryRepository = {
    async getUsers(
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
            return {
                users: await usersCollection
                    .find(searchKey)
                    .sort(sortKey)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await usersCollection.countDocuments(searchKey)
            }
        } else {
            return {
                users: usersCollection
                    .find(searchKey)
                    .sort(sortKey)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(+pageSize).toArray(),
                totalCount: await usersCollection.countDocuments(searchKey)
            }
        }
    },

    async getUsersById(id: string) {
        return await usersCollection.findOne({id: id})
    }
}