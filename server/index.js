const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
app.use(express.json())
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))


//Connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err) throw err
        console.log('Connected to DB')
    }
)

//Routers
app.use('/api/tasks', require('./routers/tasks'))
app.use('/api/users', require('./routers/users'))

//Listen
const port = 3001
app.listen(port, () => { console.log(`Server is running on port ${port}`) })