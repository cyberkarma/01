import { MongoClient, ObjectId } from 'mongodb'
import {IBlogIM} from "./blogs/blog";
import * as dotenv from 'dotenv';
import {IPostIM} from "./posts/post";
dotenv.config();





const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const client = new MongoClient(mongoUri)
console.log('Mongo local url:', mongoUri)

export const blogsCollection = client.db('blogger-platform').collection<IBlogIM>('blogs', {raw: true})
export const postsCollection = client.db('blogger-platform').collection<IPostIM>('posts', {raw: true})

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connect successfully to the data base!')
    } catch (e) {
        console.log('Error while connecting to the data base!!!')
        await client.close()
    }
}