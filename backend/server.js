//เชื่อมต่อ server ฝั่ง backend ของ xampp mysql
const express = require('express')
const cors = require('cors')
const authRouterUser = require('./routes/user')
const authRouterAdmin = require('./routes/admin')
//const sequelize = require('./config/db')

const app = express()
const db = require('./config/db')

app.use(express.json())
app.use(cors())
db.sequelize.sync()

app.use('/api', authRouterAdmin)
app.use('/api', authRouterUser)

const port = 8000
app.listen(port, () => {
    console.log('listening')
})