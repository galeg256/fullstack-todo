import {db} from '../app.js'

export const getAll = (req,res) => {
    const sqlSelect = "Select * from todo_list"
    db.query(sqlSelect,(err, result) => {
        if (err) res.send(err)
        else res.status(200).send(result)
    })
}

export const createToDo = (req, res) => {
    const name = req.body.name
    
    const sqlInsert = "INSERT INTO todo_list (name) VALUES (?);"
    db.query(sqlInsert, name, (err, result) => {
        if (err) res.send(err)
        else res.status(200).send("success")
    })
}

export const deleteToDo = (req, res) => {
    const id = req.params.id
    
    const sqlDelete = "DELETE FROM todo_list WHERE id=?"
    db.query(sqlDelete, id,(err, result) => {
        if (err) res.send(err)
        else res.status(200).send("success")
    })
}

export const updateToDo = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    
    const sqlUpdate = "UPDATE todo_list SET name=? WHERE id=?"
    db.query(sqlUpdate, [name, id],(err, result) => {
        if (err) res.send(err)
        else res.status(200).send("success")
    })
}