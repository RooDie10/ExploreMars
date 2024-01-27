import express from 'express'
import session from 'express-session'
import { templatesRouter } from './routing/templates_routing'
import { apiRouter } from './routing/api_routing'
import { isUserAuth } from './routing/middlewares/middlewares'

const app = express()
const port = process.env.PORT || 3000

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
  })
)

app.use('/profile', isUserAuth)
app.use(express.static('public', { extensions: ['html'] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/templates', templatesRouter())
app.use('/api', apiRouter())

app.listen(+port, '0.0.0.0', () =>
  console.log(`server is listening on port ${port}\nhttp://localhost:${port}/`)
)
