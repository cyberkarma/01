import { validationResult, check, FieldValidationError } from "express-validator";
import {Request, Response, NextFunction} from "express";

type ValidationResultError = {
    [string: string]: [string];
};

// Функция, возвращающая массив проверок
export const PostValidationRules = () => {
    return [
        check('title').trim().notEmpty().withMessage('title!').isLength({max: 30}),
        check('shortDescription').notEmpty().withMessage('shortDescription!!!').isLength({max: 100}),
        check('content').notEmpty().withMessage('content!!!').isLength({max: 1000})
    ]
}

export const PostInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array({ onlyFirstError: true }).map(error => {
            return {
                message: error.msg,
                field: error.type === 'field' && error.path
            }
        });

        res.status(400).json({ errorsMessages: formattedErrors });
    } else {
        next();
    }
}