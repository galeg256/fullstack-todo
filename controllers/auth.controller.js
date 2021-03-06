import {db} from '../app.js'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import {config} from '../config/keys.js'
import {mailer} from '../config/nodemailer.js'

export const users = (req,res) => {
    const sqlSelect = "Select * from user"
    db.query(sqlSelect,(err, result) => {
        if (err) res.send(err)
        else res.status(200).send(result)
        //else console.log(result)
    })
}

export const login = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(412).json({errors: errors.array(), message: "Некорректные данные при регистрации"})
    } else {
        const login = req.body.login
        const password = req.body.password

        let sqlSelect = "Select * from user where userLogin=?;"
        db.query(sqlSelect, login, async (err, result) => {
            if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
            if (result.length == 0) {
                return res.status(404).send({msg: "Ошибка авторизации"})
            } else {
                const data = result[0]
                const isMatch = await bcrypt.compare(password, data.userPassword)
                if (isMatch) {
                    const token = jwt.sign({
                        email: data.userLogin,
                        userId: data.userId
                    }, config.jwt, {expiresIn: 60*60})
                    res.json({
                        msg: "Вход в систему выполнен",
                        token: `Bearer ${token}`
                    })
                }
                else res.status(404).send({msg:"Ошибка авторизации"})
            }
        })   
    }   
}

export const register = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(412).json({errors: errors.array(), message: "Некорректные данные при регистрации"})
    }
    else {
        const login = req.body.login
        const password = req.body.password

        let sqlSelect = "Select * from user where userLogin=?"
        db.query(sqlSelect, login, async (err, result) => {
            if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
            if (result.length)
                res.status(400).send({msg: "Пользователь уже существует"})
            else {
                const hashPassword = await bcrypt.hash(password, 12)

                const sqlInsert = "INSERT INTO user (userLogin, userPassword) VALUES (?,?);"
                db.query(sqlInsert, [login, hashPassword], (err, result) => {
                    if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
                    else { 
                        mailer(login, password)
                        const userId = result.insertId
                        const token = jwt.sign({
                            email: login,
                            userId: userId
                        }, config.jwt, {expiresIn: 60*60})
                        res.json({
                            msg: "Вход в систему выполнен",
                            token: `Bearer ${token}`
                        })
                    }   
                })
            }

        })
        
    }
}