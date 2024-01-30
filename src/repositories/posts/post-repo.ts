import {generatePosts, IPostIM, IPostVM} from "./post";


export const posts = generatePosts(5);
// export const posts: IPostVM[] = []

export const postsRepository = {
    getPosts(id: string | undefined | null) {
        if(id) {
            console.log('Here')
            return posts.filter(p => p.id && p.id.indexOf(id) > -1);
        } else {
            return posts
        }
    },

    createPost(post: IPostIM) {
        const newPost: IPostVM = {
            id: post.id || Math.floor(Math.random() * 100).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName || ''
        }
        posts.push(newPost)
        return newPost
    },

    updatePost(id: string, post: IPostIM) {
        const foundPost = posts.find((p)=> p.id === id);
        if(!foundPost) {
            return
        }
        foundPost.title = post.title
        foundPost.shortDescription = post.shortDescription
        foundPost.content = post.content
        foundPost.blogId = post.blogId
        console.log('updated post: ', foundPost)
        return foundPost
    },
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if(posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        } return false
    }
}