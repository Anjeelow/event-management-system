const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const supabase = require('./supabase')

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
        if (error) {
            throw error;
        }
        res.json({ events: data })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})