import {generateVideos, IVideo} from "./video";
import {validateVideo} from "../../utils/inputvalidation";

const videos = generateVideos(10)

export const videoRepository = {

    findVideos(searchTerm: string | undefined | null) {
        if (searchTerm) {
            return videos.filter(v => v.title.indexOf(searchTerm) > -1)
        } else {
            return videos
        }
    },

    createVideo(video: IVideo) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);

        const newVideo = {
            author: video.author,
            availableResolutions: video.availableResolutions,
            canBeDownloaded: false,
            createdAt: new Date().toISOString(),
            id: +(new Date()),
            publicationDate: currentDate.toISOString(),
            title: video.title,
            minAgeRestriction: null
        }
        return newVideo
    },

}