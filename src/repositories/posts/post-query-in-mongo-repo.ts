import {postsCollection} from "../db";

export const postQueryRepository = {
    async getPosts(title: string | undefined | null) {
        let searchKey = {}
        if (title) searchKey = {blogId: title};
        if(title) {
            return {
                posts: postsCollection.find(searchKey).sort({createdAt: -1}).toArray(),
                totalCount: postsCollection.countDocuments(searchKey)
            }
        } else {
            return {
                posts: postsCollection.find().sort({createdAt: -1}).toArray(),
                totalCount: postsCollection.countDocuments()
            }
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