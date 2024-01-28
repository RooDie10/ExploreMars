import express from 'express'
import session from 'express-session'
import { mainRouter } from './routing/main_router'
import { viewsRouter } from './routing/veiws_router'
import { apiRouter } from './routing/api_routing'

const app = express()

const port = process.env.PORT || 3000

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

if (!process.env.PORT) app.listen(+port, '0.0.0.0', () => {})
else
  app.listen(port, () => {
    console.log(`localhost:${port}`)
  })
