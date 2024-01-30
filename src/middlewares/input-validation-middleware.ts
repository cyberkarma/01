import { validationResult, check, FieldValidationError } from "express-validator";
import {Request, Response, NextFunction} from "express";
import {blogRepository} from "../repositories/blogs/blog-repo";

type ValidationResultError = {
    [string: string]: [string];
};

// Функция, возвращающая массив проверок
export const blogValidationRules = () => {
    return [
        check('name').trim().notEmpty().withMessage('name !').isLength({ max: 15 }),
        check('description').notEmpty().withMessage('description!').isLength({ max: 500 }),
        check('websiteUrl').notEmpty().withMessage('websiteUrl!').isURL().withMessage('websiteUrl!!').isLength({ max: 100 })
    ];
};

export const postValidationRules = () => {
    return [
        check('title').trim().notEmpty().withMessage('title!').isLength({max: 30}),
        check('shortDescription').notEmpty().withMessage('shortDescription!!!').isLength({max: 100}),
        check('content').notEmpty().withMessage('content!!!').isLength({max: 1000}),
        check('blogId').notEmpty().withMessage('BLOG ID').custom(( value ) => {
            if (!blogRepository.getBlogs(value).length) {
                console.log('Валидация не пройдена')
                return false
            }
            return true; // Валидация пройдена
        })
    ]
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array({ onlyFirstError: true }).map(error => {
            return {
                message: error.msg,
                field: error.type === 'field' && error.path
            }
        });

        console.log('Errors: ', errors)

        res.status(400).json({ errorsMessages: formattedErrors });
    } else {
        next();
    }
}