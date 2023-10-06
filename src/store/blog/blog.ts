export interface IBlog {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export function generateBlogs(count: number): IBlog[] {
    const blogs: IBlog[] = [];

    for (let i = 0; i < count; i++) {
        const blog: IBlog = {
            id: `blog${i + 1}`,
            name: `Blog ${i + 1}`,
            description: `Description for Blog ${i + 1}`,
            websiteUrl: `https://www.blog${i + 1}.com`
        };

        blogs.push(blog);
    }

    return blogs;
}
