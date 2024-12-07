import express from 'express'
import { query } from '../db-service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const existingUser = await query('SELECT * FROM User WHERE email = ?', [email])
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email is already registered'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const sql = `
            INSERT INTO User (first_name, last_name, email, password_hash, created_at, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `
        await query(sql, [firstName, lastName, email, hashedPassword])

        const lastPerson = await query('SELECT LAST_INSERT_ID() AS user_id')
        const lastUserId = lastPerson[0].user_id

        const token = jwt.sign({ lastUserId }, 'jwt_top_secret', { expiresIn: '1h' })
        console.log(lastPerson)

        res.status(201).json({ token, message: 'User registered successfully' })
        
    } catch (error) {
        res.status(500).json({ message: 'An error occured during signup' })
    }
})

export default router;