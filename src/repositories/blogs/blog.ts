export interface IBlogIM {
    id?: string
    name: string //max15
    description: string //max500
    websiteUrl: string //max100 patternURL
    isMembership?: boolean
    createdAt?: Date
    _id?: string
}

export interface IBlogVM extends IBlogIM {
    id: string
}

function generateRandomString(maxLength: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = Math.floor(Math.random() * maxLength) + 1; // Длина от 1 до maxLength
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomUrl(maxLength: number): string {
    let url = 'https://';
    const domain = '.com';
    url += generateRandomString(maxLength - url.length - domain.length);
    url += domain;
    return url;
}

export function generateBlogs(count: number): IBlogVM[] {
    const blogs: IBlogVM[] = [];
    for (let i = 0; i < count; i++) {
        const blog: IBlogVM = {
            name: generateRandomString(15),
            description: generateRandomString(500),
            websiteUrl: generateRandomUrl(100),
            id: (count + i).toString()
        };
        blogs.push(blog);
    }
    return blogs;
}

