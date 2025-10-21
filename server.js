const express = require('express')
const app = express()
const fs = require('fs')
const data = require('./messages.json')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css')) //za bootstrap
app.use(express.json()) // body svakog requesta pretvori direktno u object

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {users: data}) // index.ejs iz foldera views
})


app.post('/messages', (req, res) => {
    fs.readFile('./messages.json', 'utf-8', (error, content) => {
        let arr = JSON.parse(content)
        arr.push(req.body) // req.body tretiramo odmah kao objekat
        console.log(arr)
        fs.writeFile('./messages.json', JSON.stringify(arr), (err) => { // samo jedan argument (err)
            res.send({status: "super", data: arr}) // ovo saljemo u main.js(res.send automatski pretvara object u JSON)
        })
    })
})

app.listen(3000, () => {
    console.log('Server running on 3000 PORT.......')
})