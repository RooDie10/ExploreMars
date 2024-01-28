import express from 'express'
import session from 'express-session'
import { mainRouter } from './routing/main_router'
import { viewsRouter } from './routing/veiws_router'
import { apiRouter } from './routing/api_routing'

const app = express()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use('/', mainRouter())
app.use('/views', viewsRouter())
app.use('/api', apiRouter())

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
