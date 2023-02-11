const { urlencoded, static, json } = require('express')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const { handleError } = require('./utils/errors')

const app = express()

app.use(methodOverride('_method'))
app.use(urlencoded({
    extended: true,
}))
app.use(static('public'))
// app.use(json()) Content-Type: application/json

app.engine('.hbs', engine({ 
    extname: '.hbs',
    // helpers: handlebarsHelpers
}))
app.set('view engine', '.hbs')

app.get('/', (req, res) =>{
    res.redirect('/children')
})

app.get('/children', (req, res) =>{
    res.render('children/list')
})

app.use(handleError)

app.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})