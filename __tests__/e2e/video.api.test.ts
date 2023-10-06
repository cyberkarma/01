import request from "supertest";
import {app} from "../../src";
import {RouterPaths} from "../../src/server/runserver/runserver";
import {IVideo} from "../../src/store/video/video";




const getRequest = () => {
    return request(app)
}

describe('tests for /videos', () => {
    beforeAll(async() => {
        await getRequest().delete('/testing/all-data')

    })

    it('Should return 200 and [videos]', async() => {
        await getRequest().get(RouterPaths.videos).expect(200, )
    })

    it('Should return an error for not existing course', async() => {
        await getRequest().get(`${RouterPaths.videos}/1`).expect(404)
    })

    it('Return error with incorrect input data', async() => {
        const data = {title: ''}

        await getRequest().post(RouterPaths.videos).send(data).expect(400)
    })

})