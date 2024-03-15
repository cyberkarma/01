import {Router} from "express";

export const usersRouter = Router({})

usersRouter.post('/', async () => {
    console.log('USERS')
})