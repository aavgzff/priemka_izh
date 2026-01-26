import 'dotenv/config'
import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://192.168.1.169:5173'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))

app.use(express.json())

app.post('/send-form', async (req, res) => {
    try {
        const {
            name,
            phone,
            finishType,
            rooms,
            thermalInspection
        } = req.body

        if (!name || !phone) {
            return res.status(400).json({ success: false })
        }

        const message = `
📩 *Новая заявка!*

👤 Имя: ${name}
📞 Телефон: ${phone}

🏠 Вид отделки: ${finishType || 'Не указано'}
🚪 Комнат: ${rooms || 'Не указано'}
🔥 Тепловизор: ${thermalInspection ? 'Да (+2500 ₽)' : 'Нет'}
`

        await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            }
        )

        res.json({ success: true })
    } catch (err) {
        console.error(err.response?.data || err.message)
        res.status(500).json({ success: false })
    }
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://192.168.1.169:${PORT}`)
})
