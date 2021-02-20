import nodemailer from 'nodemailer'

const serverEmail = 'unu_asmik@mail.ru'
const serverPassword = 'korekova5632'

const transporter = nodemailer.createTransport(
    {
        //фейковая почта
        //host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false,
        // auth: {
        //     user: 'oceane.ryan@ethereal.email',
        //     pass: 'e3de8zDaXEKhJFPj8U'
        // },
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: serverEmail,
            pass: serverPassword
        },
    },
    {
        from: `Mailer Test <${serverEmail}>`,
    }
)

export const mailer = (email, password) => {
    const message = {
        to: email,
        subject: 'Register success!',
        html: `
        <h2>Поздравляем, Вы успешно зарегистрировались на сайте posilkoved.ru! </h2>
        
        <i>Данные Вашей учетной записи: </i>
        <ul>
            <li>Логин: ${email}</li>
            <li>Пароль: ${password}</li>        
        </ul>
        
        <p>Данное письмо не требует ответа</p>`
    }
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err)
        console.log('Email sent: ', info)
    })
}
