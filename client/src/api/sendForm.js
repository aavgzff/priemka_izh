import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const sendForm = async (data) => {
    const res = await axios.post(
        `${API_URL}/send-form`,
        data,
        {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
        }
    )

    if (!res.data.success) {
        throw new Error('Ошибка сервера')
    }

    return res.data
}
