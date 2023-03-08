import * as express from 'express'
import * as cors from 'cors'
import  { urlencoded, static as staticExpress, json } from 'express'
import 'express-async-errors'
// import { engine } from 'express-handlebars'
// import * as methodOverride from 'method-override'

import { childRouter } from './routes/child'
import { giftRouter } from './routes/gift'
import { homeRouter } from './routes/home'
import { handleError } from './utils/errors'
import { handlebarsHelpers } from './utils/handlebars-helpers'
import './utils/db'

const app = express()

app.use(cors({
    origin: 'https://localhost:3001'
}))
app.use(json())

// app.use(methodOverride('_method'))
// app.use(urlencoded({
//     extended: true,
// }))
// app.use(staticExpress('public'))

// app.engine('.hbs', engine({ 
//     extname: '.hbs',
//     helpers: handlebarsHelpers   
// }))
// app.set('view engine', '.hbs')

app.use('/', homeRouter)
app.use('/child', childRouter)
app.use('/gift', giftRouter)

app.use(handleError)

app.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})