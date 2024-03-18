import {Router, Response, Request} from "express";
import {usersService} from "../service/users-service";
import {usersQueryRepository} from "../repositories/users/users-query-in-mongo-repo";
import {prepareUserResponse} from "../users";
import {usersRepository} from "../repositories/users/users-in-mongo-db-repo";
import {basicAuth} from "../middlewares/authorization-middleware";

export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {
    const query = req.query

    const sortData = {
        sortBy: query.sortBy || "createdAt",
        sortDirection: query.sortDirection || "desc",
        pageNumber: query.pageNumber || 1,
        pageSize: query.pageSize || 10,
    }

    const searchData = {
        searchLoginTerm: query.searchLoginTerm || null,
        searchEmailTerm: query.searchEmailTerm || null
    }

    const users = await usersQueryRepository.getUsers(sortData, searchData)
    res.json(users)
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const foundUser = await usersQueryRepository.getUsersById(req.params.id)

    if(!foundUser) {
        res.status(404).send
    } else {
        const responseUser = prepareUserResponse(foundUser)
        res.send(responseUser)
    }
})

usersRouter.post('/',
    basicAuth,
    async (req: Request, res: Response) => {
    const newUser = await usersService.createUser(req.body)
    if(newUser) {
        const responseUser = prepareUserResponse(newUser)
        res.status(201).send(responseUser)
    } else {
        res.status(500).send({ error: 'Internal Server Error' });
    }

})

usersRouter.put('/:id',
    basicAuth,
    async (req: Request, res: Response) => {
    const {id} = req.params
    const updatedUser = await usersService.updateUser(id, req.body)
    if(!updatedUser) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
})

usersRouter.delete('/:id',
    basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await usersService.deleteUser(req.params.id)

    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})