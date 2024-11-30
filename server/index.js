import { supabase } from './supabase.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('Event')
        .select('*')
        
        if (error) {
            throw error;
        }
        console.log(data)
        res.json({ events: data })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})