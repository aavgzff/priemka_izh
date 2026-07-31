const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/api/projects`)
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Не удалось загрузить проекты')
  }
  return data.projects || []
}

export async function loginAdmin(password) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Ошибка входа')
  }
  return data.token
}

export async function createProject(token, formData) {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Не удалось сохранить проект')
  }
  return data.project
}

export async function deleteProject(token, id) {
  const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Не удалось удалить проект')
  }
  return true
}

export function resolveMediaUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return `${API_URL}${url.startsWith('/') ? url : `/${url}`}`
}
