import {db} from '../app.js'
import jwt_decode from 'jwt-decode'

function getUserId(req) {
    const token = req.headers.authorization //токен из параметров запроса
    return jwt_decode(token).userId //ид пользователя из токена
}

export const getAll = (req,res) => {
    const userId = getUserId(req)
    const sqlSelect = "Select id, name as text from todo.todo_list where userId=? order by id desc"
    db.query(sqlSelect, userId, (err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send(result)
    })
}

export const createToDo = async (req, res) => {
    const name = req.body.name
    const userId = getUserId(req)
    const sqlInsert = "INSERT INTO todo.todo_list (name, userId) VALUES (?,?);"
    db.query(sqlInsert, [name, userId], (err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else {           
            res.status(200).json({id: result.insertId.toString()})

            // const sqlSelect = "Select max(id) as id from todo.todo_list;"
            // db.query(sqlSelect, (err, result) => {
            //     if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
            //     else res.status(200).send(result)
            //    // else res.status(200).send("success")
            // })
       } 
   }) 
}

export const deleteToDo = (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM todo.todo_list WHERE id=?"
    db.query(sqlDelete, id,(err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send("success")
    })
}

export const updateToDo = (req, res) => {
    //console.log(res)
    const id = req.body.id
    const name = req.body.textValue
    
    const sqlUpdate = "UPDATE todo.todo_list SET name=? WHERE id=?"
    db.query(sqlUpdate, [name, id],(err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send("success")
    })
}