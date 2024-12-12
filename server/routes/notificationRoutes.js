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

export default router;