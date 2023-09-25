export interface IVideo {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction?: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: Array<IVideoResolution | string>
}

export enum IVideoResolution {
    "P144",
    "P240",
    "P360",
    "P480",
    "P720",
    "P1080",
    "P1440",
    "P2160",
}

export const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 8);
}

export const generateRandomResolution = (): string => {
    return IVideoResolution[Math.floor(Math.random() * 7)]
}

export const generateRandomVideo = (id: number): IVideo => {
    let randomResolution = generateRandomResolution()
    let res: IVideo = {
        id,
        title: `Video ${id}`,
        author: `Author ${id}`,
        canBeDownloaded: Math.random() > 0.5,
        minAgeRestriction: Math.floor(Math.random() * 18) || null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [randomResolution]
    }
    return res
}

export const generateVideos = (count: number): IVideo[] => {
    const videos = [];
    for (let i = 0; i < count; i++) {
        videos.push(generateRandomVideo(i + 1));
    }
    return videos;
}




