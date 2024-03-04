import {generatePosts, IPostIM, IPostVM} from "../../post";


// export const posts = generatePosts(5);
export const posts: IPostVM[] = []

export const postsRepository = {
    async getPosts(id: string | undefined | null) {
        if(id) {
            console.log('Here')
            return posts.filter(p => p.id && p.id.indexOf(id) > -1);
        } else {
            return posts
        }
    },

    async createPost(post: IPostIM) {
        const newPost: IPostVM = {
            id: Math.floor(Math.random() * 100).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: ''
        }
        posts.push(newPost)
        return newPost
    },

    async updatePost(id: string, post: IPostIM) {
        const foundPost = posts.find((p)=> p.id === id);
        if(!foundPost) {
            return
        }
        foundPost.title = post.title
        foundPost.shortDescription = post.shortDescription
        foundPost.content = post.content
        foundPost.blogId = post.blogId
        return foundPost
    },
    async deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if(posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        } return false
    }
}