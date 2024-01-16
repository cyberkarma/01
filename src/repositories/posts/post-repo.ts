import {generatePosts} from "./post";


export const posts = generatePosts(5);

export const postsRepository = {
    getPosts(id: string | undefined | null) {
        if(id) {
            console.log('Here')
            return posts.filter(p => p.id.indexOf(id) > -1)
        } else {
            return posts
        }
    },
}