import {postsCollection} from "../db";

export const postQueryRepository = {
    async getPosts(title: string | undefined | null, pageSize:number, pageNumber: number, sortDirection: string) {
        let searchKey = {}
        if (title) searchKey = {blogId: title};
        if(title) {
            return {
                posts: postsCollection.find(searchKey)
                    .sort({createdAt: sortDirection === 'desc' ? -1 : 1})
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize).toArray(),
                totalCount: postsCollection.countDocuments(searchKey)
            }
        } else {
            return {
                posts: postsCollection
                    .find()
                    .sort({createdAt: sortDirection === 'desc' ? -1 : 1})
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize).toArray(),
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