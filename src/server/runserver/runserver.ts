import express, {Request, Response} from 'express'


export function runServer() {
    const app = express()
    const port = 3000

    app.get('/', (req:Request, res:Response) => {
        res.send('Node is rock!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
