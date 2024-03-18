import {IUsersDBM, IUsersIM, IUsersVM} from "../users";
import {UUID} from "mongodb";
import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/users/users-in-mongo-db-repo";
import {usersQueryRepository} from "../repositories/users/users-query-in-mongo-repo";

export const usersService = {
    async createUser(user: IUsersIM) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(user.password, passwordSalt)

        const genId = new UUID()
        const newUser: IUsersDBM = {
            id: genId.toString(),
            userName: user.login,
            email: user.email,
            passwordHash,
            passwordSalt,
            createdAt: new Date(),
        }
        await usersRepository.createUser(newUser)
        return usersQueryRepository.getUsersById(genId.toString())
    },

    async updateUser(id: string, user: IUsersIM) {
        return await usersRepository.updateUser(id, user)
    },

    async deleteUser(id: string) {
        return await usersRepository.deleteUser(id)
    },

    async authUser(password:string, loginOrEmail:string) {

        const user = await usersRepository.authUser(loginOrEmail)
        if(user) {
            const isSuccess = await bcrypt.compare(password, user?.passwordHash)
            console.log(isSuccess)
            return isSuccess
        }
        return false

    },


    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    }
}