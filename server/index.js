import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { query } from './db-service.js'

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/api/events', async (req, res) => {
    try {
        const data = await query('SELECT * FROM Event')
        res.json({ events: data })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const data = await query('SELECT * FROM User')
        res.json({ users: data })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})