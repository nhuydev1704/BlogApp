import jwt from 'jsonwebtoken'

export const generateActiveToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.local.ACTIVE_TOKEN_SECRET}`, { expiresIn: '5m' })
}

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.local.ACCESS_TOKEN_SECRET}`, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.local.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })
}