const { urlencoded, static, json } = require('express')
require('express-async-errors')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const { childRouter } = require('./routes/child')
const { giftRouter } = require('./routes/gift')
const { homeRouter } = require('./routes/home')
const { handleError } = require('./utils/errors')
const { handlebarsHelpers } = require('./utils/handlebars-helpers')
require('./utils/db')

const app = express()

app.use(methodOverride('_method'))
app.use(urlencoded({
    extended: true,
}))
app.use(static('public'))
// app.use(json()) Content-Type: application/json

app.engine('.hbs', engine({ 
    extname: '.hbs',
    helpers: handlebarsHelpers
}))
app.set('view engine', '.hbs')

app.use('/', homeRouter)
app.use('/child', childRouter)
app.use('/gift', giftRouter)

app.use(handleError)

app.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})