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
        res.status(200).json({ message: 'RSVP added successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post("/api/rsvp/leave", async (req, res) => {
    try {
        const { currentEvent, userId } = req.body
        const sql = `
            DELETE FROM Rsvp WHERE event_id = ? AND user_id = ?
        `
        const data = await query(sql, [currentEvent, userId])
        res.status(200).json({ message: 'RSVP removed successfully'})
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;