import Router from 'express'
import {getAll, createToDo, updateToDo, deleteToDo} from '../controllers/todo.controller.js'
import passport from 'passport'

const router = Router()

router.get("/", passport.authenticate('jwt', {session: false}), getAll)
router.post("/", passport.authenticate('jwt', {session: false}), createToDo)
router.put("/update", passport.authenticate('jwt', {session: false}), updateToDo)
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), deleteToDo)

export default router