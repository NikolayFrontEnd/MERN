import { body } from 'express-validator';

export const registerValidator = [
body('email', 'неверный формат почты').isEmail(),
body('password', 'пароль должен быть минимум 5 симвоволов').isLength({min:5}),
body('fullName', 'имя должен быть минимум 5 симвоволов').isLength({min:3}),
body('avatarUrl').optional().isURL(),
];


export const loginValidator = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 симвоволов').isLength({min:5}),
    ];

    export const postCreateValidation = [
        body('title', 'Введите заголовок статьи').isLength({min:3}).isString(),
        body('text', 'Введите текст статьи').isLength({min:3}).isString(),
        body('tags', 'Неверный формат тэгов').optional().isString(),
        body('imageUrl' , 'Неверная ссылка на изображение').optional().isString(),
    ]