import express from 'express'
import cookieParser from 'cookie-parser'
import { mainRouter } from './routing/main_router'
import { viewsRouter } from './routing/veiws_router'
import { apiRouter } from './routing/api_router'
import { adminRouter } from './routing/admin_router'
import { isUserAdmin, isUserAuth } from './routing/middlewares/middlewares'

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(cookieParser('super secret string omg'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static('public'))

app.use('/', mainRouter())

app.use('/admin', isUserAuth)
app.use('/admin', isUserAdmin)
app.use('/admin', adminRouter())

app.use('/views', viewsRouter())
app.use('/api', apiRouter())

if (process.env.PORT) app.listen(+port, '0.0.0.0', () => {})
else
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
  })
