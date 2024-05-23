const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'davi',
    password: 'SENAI123',
    database: 'login'
});

db.connect((error) => {
    if (error) {
        console.log('Erro ao conectar com o MySQL');
    } else {
        console.log('Conectado ao MySQL')
    }
});

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req, res) => {
    const username = req.body.usuario
    const password = req.body.senha
    console.log(username, password)

    db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
        if (results.length > 0) {
            const passwordBD = results[0].password;
            if (passwordBD === password) {
                console.log('Correto, tudo certo para entrar!')
            } else {
                console.log('Senha incorreta')
            }
        } else {
            console.log('Usuário não cadastrado')
        }
    })

})


app.listen(port, () => {
    console.log(`Servidor rodando na endereço: https://localhost:${port}`)
})

