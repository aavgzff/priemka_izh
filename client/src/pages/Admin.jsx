import { useEffect, useMemo, useState } from 'react'
import { projectFilters } from '@/data/projects'
import {
  createProject,
  deleteProject,
  fetchProjects,
  loginAdmin,
  resolveMediaUrl,
} from '@/api/projects'

const TOKEN_KEY = 'metrum_admin_token'

const emptyForm = {
  title: '',
  category: 'bathrooms',
  shortDescription: '',
  description: '',
  area: '',
  duration: '',
  price: '',
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = useMemo(
    () => projectFilters.filter((item) => item.id !== 'all'),
    []
  )

  const loadProjects = async () => {
    try {
      const list = await fetchProjects()
      setProjects(list)
    } catch (error) {
      setStatus(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      loadProjects()
    }
  }, [token])

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const nextToken = await loginAdmin(password)
      sessionStorage.setItem(TOKEN_KEY, nextToken)
      setToken(nextToken)
      setPassword('')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setProjects([])
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleFiles = (event) => {
    setFiles(Array.from(event.target.files || []))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return

    if (!form.title.trim()) {
      setStatus('Укажите название проекта')
      return
    }

    if (!files.length) {
      setStatus('Выберите хотя бы одно фото')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      const body = new FormData()
      Object.entries(form).forEach(([key, value]) => body.append(key, value))
      files.forEach((file) => body.append('photos', file))

      await createProject(token, body)
      setForm(emptyForm)
      setFiles([])
      event.target.reset?.()
      setStatus('Проект добавлен')
      await loadProjects()
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот проект?')) return

    setLoading(true)
    setStatus('')

    try {
      await deleteProject(token, id)
      setStatus('Проект удалён')
      await loadProjects()
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-24 dark:bg-custom-grey">
        <form
          onSubmit={handleLogin}
          className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900"
        >
          <h1 className="text-2xl font-bold text-custom-blue dark:text-white">Админка портфолио</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Войдите, чтобы добавлять карточки проектов.
          </p>
          <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Пароль
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-custom-blue px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
          {status && <p className="mt-3 text-sm text-red-500">{status}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-24 dark:bg-custom-grey sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-custom-blue dark:text-white">Новый проект</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                Заполните описание и выберите несколько фото.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Выйти
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Название
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                required
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Категория
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                {categories.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Площадь
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="например: 5,2 м²"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Сроки
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="например: 14 дней"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Стоимость
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="например: от 145 000 ₽"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Краткое описание
              <textarea
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                rows={2}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Подробное описание
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Фото проекта
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFiles}
                className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-custom-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white dark:text-slate-300"
              />
              {files.length > 0 && (
                <span className="mt-2 block text-xs font-medium normal-case tracking-normal text-slate-500">
                  Выбрано файлов: {files.length}
                </span>
              )}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 rounded-lg bg-custom-blue px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Сохранение...' : 'Добавить проект'}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm font-medium text-custom-blue">{status}</p>
          )}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
          <h2 className="text-xl font-bold text-custom-blue dark:text-white">
            Загруженные проекты ({projects.length})
          </h2>
          <div className="mt-5 space-y-4">
            {projects.length === 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-300">Пока нет загруженных проектов.</p>
            )}
            {projects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="grid grid-cols-[96px_1fr] gap-3 p-3">
                  <img
                    src={resolveMediaUrl(project.gallery?.[0])}
                    alt={project.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {project.category} · {project.gallery?.length || 0} фото
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="mt-3 text-xs font-semibold uppercase tracking-wide text-red-500"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
