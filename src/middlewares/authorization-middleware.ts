import {Request, Response, NextFunction} from "express";

const username = 'admin';
const password = 'qwerty';
const credentials = `${username}:${password}`;
const base64Credentials = Buffer.from(credentials).toString('base64');

export const basicAuth = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const encodedCredentials = authHeader.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = decodedCredentials.split(':');

        // Проверка имени пользователя и пароля
        if (username === 'admin' && password === 'qwerty') {
            next(); // Пропуск запроса дальше
        } else {
            res.status(401).send('Unauthorized'); // Отказано в доступе
        }
    } else {
        res.status(401).send('Unauthorized'); // Отказано в доступе
    }
};