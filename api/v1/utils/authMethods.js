/**
    @description Includes all auth helper methods
*/
import { sign } from 'jsonwebtoken'
import { genSalt, hash } from 'bcryptjs'
import config from 'config'

// hash a password
export async function createHashPass(password = '') {
    const salt = await genSalt(12)
    const hashedPass = await hash(password, salt)
    return hashedPass
}

// create a token
export async function generateToken(params = {}, opts = {}) {
    const secret = config.get('jwt.secret')
    const token = sign(params, secret, opts)
    return token
}
