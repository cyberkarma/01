import {IUsersDBM, IUsersIM} from "../../users";
import {usersCollection} from "../db";

export const usersRepository = {
    async createUser(user: IUsersDBM) {
        return await usersCollection.insertOne(user)
    },

    async updateUser(id: string, user: IUsersIM) {
        const result = await usersCollection.updateOne(
            {id: id},
            {$set: user})
        return result.matchedCount === 1
    },

    async deleteUser(id: string) {
        const result = await usersCollection.deleteOne({id: id})

        return result.deletedCount === 1
    }
}