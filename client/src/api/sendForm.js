import axios from 'axios'
import { getApiUrl } from '@/api/apiBase'

const API_URL = getApiUrl()

export const sendForm = async (data) => {
  const res = await axios.post(`${API_URL}/send-form`, data, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  })

  if (!res.data.success) {
    throw new Error('Ошибка сервера')
  }

  return res.data
}
