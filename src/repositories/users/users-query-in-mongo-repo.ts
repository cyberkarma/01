import {usersCollection} from "../db";
import {prepareUserResponse} from "../../users";

export const usersQueryRepository = {
    async getUsers(
        sortData:any, searchData:any
    ) {
        let searchKey = {};
        let sortKey = {};
        let sortDirection: number;

        let searchKeysArray:Object[] = [];
        if (searchData.searchLoginTerm) searchKeysArray.push({login: {$regex: searchData.searchLoginTerm, $options: "i"}});
        if (searchData.searchEmailTerm) searchKeysArray.push({email: {$regex: searchData.searchEmailTerm, $options: "i"}});

        if (searchKeysArray.length === 0) {
            searchKey = {};
        } else if (searchKeysArray.length === 1) {
            searchKey = searchKeysArray[0]; // Исправлено здесь: присваиваем объект напрямую
        } else if (searchKeysArray.length > 1) {
            searchKey = {$or: searchKeysArray};
        }
        const documentsTotalCount = await usersCollection.countDocuments(searchKey); // Receive total count of blogs
        const pageCount = Math.ceil(documentsTotalCount / +sortData.pageSize); // Calculate total pages count according to page size
        const skippedDocuments = (+sortData.pageNumber - 1) * +sortData.pageSize; // Calculate count of skipped docs before requested page


        // check if sortDirection is "desc" assign sortDirection value -1, else assign 1
        if (sortData.sortDirection === "desc") sortDirection = -1;
        else sortDirection = 1;

        if (sortData.sortBy === "login") sortKey = {login: sortDirection};
        else if (sortData.sortBy === "email") sortKey = {email: sortDirection};
        else sortKey = {createdAt: sortDirection};

        const users = await usersCollection.find(searchKey).sort(sortKey).skip(+skippedDocuments).limit(+sortData.pageSize).toArray();
        return {
            pagesCount: pageCount,
            page: +sortData.pageNumber,
            pageSize: +sortData.pageSize,
            totalCount: documentsTotalCount,
            items: users.map(prepareUserResponse)
        }



    },

    async getUsersById(id: string) {
        return await usersCollection.findOne({id: id})
    }
}