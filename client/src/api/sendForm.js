import axios from 'axios'

export const sendForm = async (data) => {
    const res = await axios.post(
        'http://192.168.1.169:3001/send-form',
        data,
        {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        }
    )

    if (!res.data.success) {
        throw new Error('Ошибка сервера')
    }

    return res.data
}
