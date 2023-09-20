import express, {Request, Response} from 'express'
import dotenv from 'dotenv'

export function runServer() {
    dotenv.config()
    const app = express()
    const port = process.env.PORT || 3000

    app.get('/', (req:Request, res:Response) => {
        res.send('Hello Money!!!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
