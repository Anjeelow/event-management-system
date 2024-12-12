import express from 'express'
import { query } from '../db-service.js'

const router = express.Router()

router.post("/api/rsvp/attend", async (req, res) => {
    try {
        const { currentEvent, userId, currentDay } = req.body
        const sql = `
            INSERT INTO Rsvp (user_id, event_id, rsvp_date)
            VALUES (?, ?, ?)
        `
        const data = await query(sql, [userId, currentEvent, currentDay])
        res.status(200).json({ message: 'RSVP success' })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;