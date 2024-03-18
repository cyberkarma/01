import {Request, Response, Router} from "express";
import {basicAuth} from "../middlewares/authorization-middleware";
import {usersService} from "../service/users-service";
import {usersRouter} from "./users-router";

export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res: Response) => {
        console.log('body', req.body)
        const password = req.body.password
        const loginOrEmail = req.body.loginOrEmail
        const foundUser = await usersService.authUser(password, loginOrEmail)
            if(foundUser) {
                    res.status(204).send()
            } else {
                    res.status(400).send()
            }
    })