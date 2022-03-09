import jwt from 'jsonwebtoken'
import config from 'config'

const jwtSecret = config.get('jwt.jwt_secret')

export const auth = (req, res, next) => {
    const token = req.headers['auth-token']

    if (!token) return res.status(401).json({ message: 'Access Denied' })

    try {
        const verified = jwt.verify(token, jwtSecret)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).send({ message: 'Invalid token' })
    }
}
