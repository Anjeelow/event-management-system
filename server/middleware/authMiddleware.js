import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' })
    }
    
    jwt.verify(token, 'jwt-top-secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' })
        }

        req.user = user
        next()
    })
}

export default authenticateToken;