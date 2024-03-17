import {Router, Response, Request} from "express";
import {usersService} from "../service/users-service";
import {usersQueryRepository} from "../repositories/users/users-query-in-mongo-repo";
import {prepareUserResponse} from "../users";

export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {
    const query = req.query

    const sortData = {
        sortBy: query.sortBy || "createdAt",
        sortDirection: query.sortDirection || "desc",
        pageNumber: query.pageNumber || 1,
        pageSize: query.pageSize || 10,
        // searchNameTerm: query.searchNameTerm || ''
    }

    const searchData = {
        searchLoginTerm: query.searchLoginTerm || null,
        searchEmailTerm: query.searchEmailTerm || null
    }

    const {items, totalCount} = await usersQueryRepository.getUsers(
       sortData, searchData
    )

    // const {users, totalCount} = await usersQueryRepository.getUsers(
    //     req.query.name?.toString(),
    //     +sortData.pageSize,
    //     +sortData.pageNumber,
    //     sortData.sortDirection.toString(),
    //     sortData.sortBy.toString(),
    //     sortData.searchNameTerm.toString()
    // )

    const formattedUsers = (await  items).map(el => {
        return prepareUserResponse(el)
    })

    res.send({
        pagesCount: Math.ceil(totalCount / +sortData.pageSize),
        page: +sortData.pageNumber,
        pageSize: +sortData.pageSize,
        totalCount: totalCount,
        items: formattedUsers})
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

usersRouter.post('/', async (req: Request, res: Response) => {
    const newUser = await usersService.createUser(req.body)
    if(newUser) {
        const responseUser = prepareUserResponse(newUser)
        res.status(201).send(responseUser)
    } else {
        res.status(500).send({ error: 'Internal Server Error' });
    }

})

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const updatedUser = await usersService.updateUser(id, req.body)
    if(!updatedUser) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await usersService.deleteUser(req.params.id)

    if(isDeleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})