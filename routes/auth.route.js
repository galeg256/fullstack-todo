import Router from 'express'
import {login, register, users} from '../controllers/auth.controller.js'
import {check} from 'express-validator'

const router = Router()

router.get("/", users)
router.post("/login", [
    check('login','Некорректный email').isEmail(),
    check('password', "Минимальная длина пароля 6 символов").exists()
], login)
router.post("/register", [
    check('login','Некорректный email').isEmail(),
    check('password', "Минимальная длина пароля 6 символов").isLength({min: 6})
], register)

export default router