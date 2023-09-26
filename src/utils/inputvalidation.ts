import {IVideo} from "../store/video/video";

interface ValidationError {
    message: string | null;
    field: string | null;
}

export function validateVideo(video: IVideo): ValidationError[] {
    const errors: ValidationError[] = [];

    // if (typeof video.id !== 'number') {
    //     errors.push({
    //         message: 'Invalid id format',
    //         field: 'id'
    //     });
    // }

    if (typeof video.title !== 'string' || video.title.trim() === '' || video.title.length > 40) {
        errors.push({
            message: 'Invalid title format',
            field: 'title'
        });
    }

    if (typeof video.author !== 'string' || video.author.trim() === '' || video.author.length > 20) {
        errors.push({
            message: 'Invalid author format',
            field: 'author'
        });
    }

    if (video.minAgeRestriction !== undefined && (typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.push({
            message: 'Invalid minAgeRestriction format',
            field: 'minAgeRestriction'
        });
    }

    if (video.createdAt !== undefined && !isValidDateTime(video.createdAt)) {
        errors.push({
            message: 'Invalid createdAt format',
            field: 'createdAt'
        });
    }

    if (video.publicationDate !== undefined && !isValidDateTime(video.publicationDate)) {
        errors.push({
            message: 'Invalid publicationDate format',
            field: 'publicationDate'
        });
    }

    if (video.availableResolutions !== undefined && !Array.isArray(video.availableResolutions)) {
        errors.push({
            message: 'Invalid availableResolutions format',
            field: 'availableResolutions'
        });
    }

    return errors;
}

function isValidDateTime(dateTime: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(dateTime);
}

