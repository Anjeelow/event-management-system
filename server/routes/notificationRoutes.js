import express from 'express'
import { query } from '../db-service.js'

const router = express.Router()

router.get("/api/notifications", async (req, res) => {
    try {
        const data = await query("SELECT * FROM notification")
        res.status(200).json({ notifications: data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/api/events/notify", async (req, res) => {
    try {
        const { eventId, message } = req.body
        const rsvps = await query('SELECT user_id FROM Rsvp WHERE event_id = ?', [eventId])
        const notifications = rsvps.map(({ user_id }) => [
            user_id, eventId, message, new Date()
        ])
        if (notifications.length) {
            await query('INSERT INTO notification (user_id, event_id, message, sent_at) VALUES ?', [notifications])
        }
        res.status(200).json({ message: 'Notifications sent successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;