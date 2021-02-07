import Router from 'express'
import {getAll, createToDo, updateToDo, deleteToDo} from '../controllers/routes.js'

const router = Router()

router.get("/", getAll)
router.post("/", createToDo)
router.put("/update", updateToDo)
router.delete("/delete/:id", deleteToDo)

export default router