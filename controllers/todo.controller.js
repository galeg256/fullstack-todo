import {db} from '../app.js'

export const getAll = (req,res) => {
    const sqlSelect = "Select id, name as text from todo_list order by id desc"
    db.query(sqlSelect,(err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send(result)
    })
}

export const createToDo = async (req, res) => {
    const name = req.body.name
    
    const sqlInsert = "INSERT INTO todo.todo_list (name, userId) VALUES (?,1);"
    db.query(sqlInsert, name, (err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else {
            const sqlSelect = "Select max(id) as id from todo.todo_list;"
            db.query(sqlSelect, (err, result) => {
                if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
                else res.status(200).send(result)
               // else res.status(200).send("success")
            })
        }
    })
}

export const deleteToDo = (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM todo_list WHERE id=?"
    db.query(sqlDelete, id,(err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send("success")
    })
}

export const updateToDo = (req, res) => {
    //console.log(res)
    const id = req.body.id
    const name = req.body.textValue
    
    const sqlUpdate = "UPDATE todo_list SET name=? WHERE id=?"
    db.query(sqlUpdate, [name, id],(err, result) => {
        if (err) return res.status(500).json({msg: "Ошибка БД", errors: err})
        else res.status(200).send("success")
    })
}