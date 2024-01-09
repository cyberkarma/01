import {generateVideos, IVideo} from "./video";
import {validateVideo} from "../../utils/inputvalidation";

const videos: IVideo[] = generateVideos(10)

export const videoRepository = {

    findVideos(id: string | undefined | null) {
        console.log(typeof id, "VIDEOID")
        if (id) {
            return videos.filter(v => v.title.indexOf(id) > -1)
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

    updateVideo(id: number, video: IVideo) {
        const foundVideo = videos.find((v) => v.id === +id);
        if (!foundVideo) {
            return;
        }
        // Обновляем свойства видео, только если они присутствуют в req.body
        if (video.title) {
            foundVideo.title = video.title;
        }
        if (video.author) {
            foundVideo.author = video.author;
        }
        if (video.availableResolutions) {
            foundVideo.availableResolutions = video.availableResolutions;
        }
        if (video.canBeDownloaded !== undefined) {
            foundVideo.canBeDownloaded = video.canBeDownloaded;
        }
        if (video.minAgeRestriction !== undefined) {
            foundVideo.minAgeRestriction = video.minAgeRestriction;
        }
        if (video.publicationDate) {
            foundVideo.publicationDate = video.publicationDate;
        }
        return foundVideo;
    },

    deleteVideo(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    }
}