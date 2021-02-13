import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'
import todoRoute from './routes/todo.route.js'
import authRoute from './routes/auth.route.js'


const app = express() 

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todo",
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/api', todoRoute)
app.use('/api/auth', authRoute)

db.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
    });

app.listen(5000, () => console.log('сервер запущен'))
