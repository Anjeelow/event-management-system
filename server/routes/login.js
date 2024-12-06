import express from 'express'
import { query } from '../db-service.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const existingUser = await query(`SELECT * FROM User WHERE email = ?`, [email])

        if (existingUser.length === 0) {
            return res.status(404).json({ message: 'Invalid email or password' })
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser[0].password_hash)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        return res.status(200).json({ message: 'Login successful', user: { user_id: existingUser[0].user_id, email: existingUser[0].email } })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

export default router