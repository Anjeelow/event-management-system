import express from 'express'
import { query } from '../db-service.js'

const router = express.Router()

router.post("/api/rsvp/attend", async (req, res) => {
    try {
        const { currentEvent, userId, currentDay } = req.body
        
        await query('INSERT INTO Rsvp (user_id, event_id, rsvp_date) VALUES (?, ?, ?)', [userId, currentEvent.event_id, currentDay])
        await query('UPDATE Event SET attendee_count = attendee_count + 1 WHERE event_id = ?', [currentEvent.event_id])

        res.status(200).json({ message: 'RSVP added successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post("/api/rsvp/leave", async (req, res) => {
    try {
        const { currentEvent, userId } = req.body

        await query('DELETE FROM Rsvp WHERE event_id = ? AND user_id = ?', [currentEvent.event_id, userId])
        await query('UPDATE Event SET attendee_count = attendee_count - 1 WHERE event_id = ?', [currentEvent.event_id])

        res.status(200).json({ message: 'RSVP removed successfully'})
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;