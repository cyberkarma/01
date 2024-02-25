import {Document, WithId} from "mongodb";
import {IBlogIM, IBlogVM} from "../blogs/blog";

export interface IPostIM {
    title: string; // max 30
    shortDescription: string; // max 100
    content: string; // max 1000
    blogId: string;
    // id?: string;
    // blogName?: string;
}

export interface IPostVM extends IPostIM {
    id: string;
    blogName: string;
    createdAt?: Date
}
export function preparePostResponse(doc: WithId<IPostIM>): IPostVM {
    const { _id, ...rest } = doc;
    return rest as IPostVM;
}

function generateRandomString(maxLength: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    const length = Math.floor(Math.random() * maxLength) + 1; // Длина от 1 до maxLength
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generatePosts(count: number): IPostVM[] {
    const posts: IPostVM[] = [];
    for (let i = 0; i < count; i++) {
        const post: IPostVM = {
            title: generateRandomString(30),
            shortDescription: generateRandomString(100),
            content: generateRandomString(1000),
            blogId: generateRandomString(10),
            id: ((count + i) * 2).toString(),
            blogName: generateRandomString(20)
        };
        posts.push(post);
    }
    return posts;
}
