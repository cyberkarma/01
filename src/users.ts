import {WithId} from "mongodb";

export interface IUsersIM {
    login: string //max 10 min 3 pattern: ^[a-zA-Z0-9_-]*$
    password: string // max 20 min 6
    email: string // patternEmail
}
export interface IUsersVM {
    id: string,
    login: string,
    email: string,
    createdAt: Date
}

export interface IUsersDBM {
    id: string,
    userName: string,
    email: string,
    passwordSalt: string,
    passwordHash: string,
    createdAt: Date
}

export function prepareUserResponse(doc: WithId<IUsersDBM>): IUsersVM {
    const { _id, ...rest} = doc

    return {
        id: doc.id,
        login: doc.userName,
        email: doc.email,
        createdAt: doc.createdAt
    }
}