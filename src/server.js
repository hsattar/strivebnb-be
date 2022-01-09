import express from "express"
import cors from "cors"
import { testDBConnection } from "./db/connection.js"
import housesRouter from "./routes/houses.js"

const server = express()
const { PORT } = process.env
const port = PORT || 3001

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => res.send('OK'))
server.use('/houses', housesRouter)

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
    testDBConnection()
})