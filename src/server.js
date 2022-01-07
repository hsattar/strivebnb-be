import express from "express"
import cors from "cors"

const server = express()
const { PORT } = process.env
const port = PORT || 3001

server.use(express.json())
server.use(cors())

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})