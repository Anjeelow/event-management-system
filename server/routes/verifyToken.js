import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/verify-token', (req, res) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(400).json({ message: 'Authorization header is missing' })
    }
    
    const token = authHeader.split(' ')[1]
    console.log(token)

    if (!token) {
        return res.status(400).json({ message: 'Token is missing' })
    }

    try {
        const decoded = jwt.verify(token, 'jwt_top_secret')
        return res.status(200).json({ message: 'Token is valid', decoded })
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
})

export default router