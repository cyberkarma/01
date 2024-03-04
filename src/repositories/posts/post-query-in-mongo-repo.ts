import {postsCollection} from "../db";

export const postQueryRepository = {
    async getPosts(title: string | undefined | null) {
        let searchKey = {}
        if (title) searchKey = {blogId: title};
        if(title) {
            return postsCollection.find(searchKey).toArray()
        } else {
            return postsCollection.find({}).toArray()
        }
    },
    async getPostById(id: string) {
        console.log('GPBYID', id)
        const post = await postsCollection.findOne({id: id })
        if(post) {
            console.log('GPBY', post)

            return post
        } else {
            console.log('GPBY null')
            return null
        }
    },
}