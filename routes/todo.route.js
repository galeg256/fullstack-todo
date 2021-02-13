import Router from 'express'
import {getAll, createToDo, updateToDo, deleteToDo} from '../controllers/todo.controller.js'

const router = Router()

router.get("/", getAll)
router.post("/", createToDo)
router.put("/update", updateToDo)
router.delete("/delete/:id", deleteToDo)

export default router