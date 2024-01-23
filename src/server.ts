import express from 'express'
// import session from 'express-session'

const app = express()
const port = 3000 || process.env.PORT

app.use(express.static('public', { extensions: ['html'] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () =>
  console.log(`server is listening on port ${port}\nhttp://localhost:${port}/`)
)
