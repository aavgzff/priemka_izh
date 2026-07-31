import 'dotenv/config'
import express from 'express'
import axios from 'axios'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'portfolio')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const ALLOWED_CATEGORIES = [
  'design-projects',
  'bathrooms',
  'livingrooms',
  'kitchens',
  'bedrooms',
  'entrances',
]

fs.mkdirSync(DATA_DIR, { recursive: true })
fs.mkdirSync(UPLOADS_DIR, { recursive: true })
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, '[]', 'utf8')
}

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://192.168.0.169:5173',
    'http://192.168.1.169:5173',
  ],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}))

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

function readProjects() {
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeProjects(projects) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf8')
}

function slugify(value) {
  return String(value || 'project')
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'project'
}

function createToken() {
  return crypto.createHash('sha256').update(`${ADMIN_PASSWORD}:metrum-admin`).digest('hex')
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!token || token !== createToken()) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  return next()
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 24,
    fileSize: 12 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|jpg)$/i.test(file.mimetype)
    cb(ok ? null : new Error('Только изображения JPG/PNG/WEBP'), ok)
  },
})

app.post('/send-form', async (req, res) => {
  try {
    const {
      name,
      phone,
      finishType,
      area,
      rooms,
      thermalInspection,
      source,
    } = req.body

    if (!name || !phone) {
      return res.status(400).json({ success: false })
    }

    const sourceText = source || 'Форма с сайта'
    const isFinishing = sourceText.toLowerCase().includes('отдел')
    const isAcceptance = sourceText.toLowerCase().includes('прием') || sourceText.toLowerCase().includes('приём')

    const title = isFinishing
      ? '📩 *Новая заявка на отделку!*'
      : isAcceptance
        ? '📩 *Новая заявка на приёмку квартиры!*'
        : '📩 *Новая заявка!*'

    const message = `
${title}

👤 Имя: ${name}
📞 Телефон: ${phone}

📌 Источник: ${sourceText}
🏠 Вид отделки: ${finishType || 'Не указано'}
📐 Площадь: ${area ? `${area} м²` : 'Не указано'}
🚪 Комнат: ${rooms || 'Не указано'}
🔥 Тепловизор: ${thermalInspection ? 'Да (+2500 ₽)' : 'Нет'}
`

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }
    )

    res.json({ success: true })
  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ success: false })
  }
})

app.post('/api/admin/login', (req, res) => {
  const password = String(req.body?.password || '')

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Неверный пароль' })
  }

  return res.json({ success: true, token: createToken() })
})

app.get('/api/projects', (_req, res) => {
  const projects = readProjects().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  res.json({ success: true, projects })
})

app.post('/api/projects', requireAdmin, upload.array('photos', 24), (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      category,
      area,
      duration,
      price,
    } = req.body

    if (!title?.trim() || !category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, error: 'Заполните название и категорию' })
    }

    if (!req.files?.length) {
      return res.status(400).json({ success: false, error: 'Добавьте хотя бы одно фото' })
    }

    const id = `${slugify(title)}-${Date.now()}`
    const projectDir = path.join(UPLOADS_DIR, category, id)
    fs.mkdirSync(projectDir, { recursive: true })

    const gallery = req.files.map((file, index) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg'
      const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg'
      const filename = `${index + 1}${safeExt}`
      fs.writeFileSync(path.join(projectDir, filename), file.buffer)
      return `/uploads/portfolio/${category}/${id}/${filename}`
    })

    const project = {
      id,
      category,
      title: title.trim(),
      shortDescription: String(shortDescription || '').trim(),
      description: String(description || '').trim(),
      area: String(area || '').trim(),
      duration: String(duration || '').trim(),
      price: String(price || '').trim(),
      gallery,
      createdAt: new Date().toISOString(),
    }

    const projects = readProjects()
    projects.unshift(project)
    writeProjects(projects)

    res.json({ success: true, project })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message || 'Ошибка сохранения' })
  }
})

app.delete('/api/projects/:id', requireAdmin, (req, res) => {
  try {
    const projects = readProjects()
    const index = projects.findIndex((item) => item.id === req.params.id)

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Проект не найден' })
    }

    const [removed] = projects.splice(index, 1)
    writeProjects(projects)

    const dir = path.join(UPLOADS_DIR, removed.category, removed.id)
    fs.rmSync(dir, { recursive: true, force: true })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Ошибка удаления' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
