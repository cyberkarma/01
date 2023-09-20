import express, {Request, Response} from 'express'
const app = express()
const port = 3333

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Money!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
