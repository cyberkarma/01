import { MongoClient, ObjectId } from 'mongodb'
import {IBlogIM} from "../blog";
import * as dotenv from 'dotenv';
import {IPostIM} from "../post";
dotenv.config();





const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const client = new MongoClient(mongoUri)
console.log('Mongo local url:', mongoUri)

export const blogsCollection = client.db('blogger-platform').collection<IBlogIM>('blogs')
export const postsCollection = client.db('blogger-platform').collection<IPostIM>('posts')

export const collectionsList = client.db('blogger-platform').listCollections()

export const dbInstance = client.db('blogger-platform')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connect successfully to the data base!')
    } catch (e) {
        console.log('Error while connecting to the data base!!!')
        await client.close()
    }
}