import { MongoClient, ObjectId } from 'mongodb'
import {IBlogIM} from "./blogs/blog";
import * as dotenv from 'dotenv';
import {IPostIM} from "./posts/post";
dotenv.config();





const mongoUri = process.env.MONGO_URL || 'mongodb+srv://icegroovekid:QFhy8kZGDYpIyyCZ@youtube.hv5zotg.mongodb.net/?retryWrites=true&w=majority'
export const client = new MongoClient(mongoUri)
console.log('Mongo local url:', mongoUri)

export const blogsCollection = client.db('blogger-platform').collection<IBlogIM>('blogs')
export const postsCollection = client.db('blogger-platform').collection<IPostIM>('posts')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connect successfully to the data base!')
    } catch (e) {
        console.log('Error while connecting to the data base!!!')
        await client.close()
    }
}