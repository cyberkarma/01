import { validationResult, check } from "express-validator";
import {Request, Response, NextFunction} from "express";

// Функция, возвращающая массив проверок
export const blogValidationRules = () => {
    return [
        check('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 15 }),
        check('description').notEmpty().withMessage('Description is required').isLength({ max: 500 }),
        check('websiteUrl').notEmpty().withMessage('Website URL is required').isURL().withMessage('Invalid URL').isLength({ max: 100 })
    ];
};

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array().map(error => {
            return {
                message: error.msg,
                field: error.msg
            };
        });

        res.status(400).json({ errorsMessages: errorsArray });
    } else {
        next();
    }
    // const errorsMessages = validationResult(req);
    // if (!errorsMessages.isEmpty()) {
    //     res.status(400).json({ errorsMessages: errorsMessages.array() });
    //     return
    // } else {
    //     next()
    // }
}