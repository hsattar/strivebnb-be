import express from "express"
import cors from "cors"
import { testDBConnection } from "./db/connection.js"
import usersRouter from "./routes/users.js"
import locationsRouter from "./routes/locations.js"
import housesRouter from "./routes/houses.js"
import { errorHandlers } from './middlewares/errorHandlers.js'

const server = express()
const { PORT } = process.env
const port = PORT || 3001

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => res.send('OK'))
server.use('/users', usersRouter)
server.use('/locations', locationsRouter)
server.use('/houses', housesRouter)
server.use(errorHandlers)

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
    testDBConnection()
})