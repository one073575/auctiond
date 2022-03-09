import axios from 'axios'
import Cookies from 'js-cookie'
import { constants } from './constants.config'

export default async function invoke(method, path, data = {}) {
    const url = `${constants.baseUrl}/api/v1/${path}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            SameSite: 'Secure',
        },
    }

    const token = Cookies.get('auth-token')
    if (token) {
        config.headers['auth-token'] = token
    }

    const res = await axios({
        method,
        url,
        data,
        headers: config.headers,
    })

    return res
}
