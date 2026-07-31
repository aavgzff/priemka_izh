import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { FaChevronDown, FaRegCalendarAlt, FaRulerCombined, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { projectDetails, projectFilters } from '@/data/projects'
import { fetchProjects, resolveMediaUrl } from '@/api/projects'
import { pauseSmoothScroll } from '@/lib/scroll'
import { ScrollFadeInUp, ScrollStagger } from '@/components/AnimatedElements'

const folderTitleMap = {
  'design-projects': 'Дизайн-проект',
  bathrooms: 'Санузел',
  livingrooms: 'Гостиная',
  kitchens: 'Кухня',
  bedrooms: 'Спальня',
  entrances: 'Прихожая',
}

const jkNames = [
  'Северная долина',
  'Маяк',
  'Лесная поляна',
  'Зелёный берег',
  'Солнечная высота',
  'Городской квартал',
  'Речной бриз',
  'Видный парк',
]

const categoryTemplates = {
  'design-projects': 'Дизайн-проект',
  bathrooms: 'Санузел',
  livingrooms: 'Гостиная',
  kitchens: 'Кухня',
  bedrooms: 'Спальня',
  entrances: 'Прихожая',
}

const projectDescriptionTemplates = {
  'design-projects': [
    'Сбалансированный дизайн-проект с функциональной планировкой и атмосферным освещением.',
    'Современная концепция интерьера с акцентами на натуральные материалы и эргономику.',
    'Премиальный проект с уникальными деталями и красивой цветовой палитрой.',
  ],
  bathrooms: [
    'Компактный санузел с оптимальной организацией пространства и стильной отделкой.',
    'Санузел с акцентом на комфорт, качественную сантехнику и спокойную гамму.',
    'Минималистичный санузел с тёплыми текстурами и продуманной эргономикой.',
  ],
  livingrooms: [
    'Тёплая гостиная с комфортной зоной отдыха и современными декоративными решениями.',
    'Гостиная с мягкой мебелью, насыщенной цветовой гаммой и уютной атмосферой.',
    'Просторная гостиная с акцентами на свет и натуральные материалы.',
  ],
  kitchens: [
    'Функциональная кухня с удобной рабочей зоной и элегантными фасадами.',
    'Кухня с современным стилем, местом для завтраков и продуманной техникой.',
    'Кухня с яркими акцентами, удобной зоной хранения и гармоничным освещением.',
  ],
  bedrooms: [
    'Уютная спальня с текстильными акцентами и мягкой атмосферой для сна.',
    'Спальня с продуманными зонами хранения и спокойным интерьером.',
    'Современная спальня с элегантным сочетанием цвета и мягких материалов.',
  ],
  entrances: [
    'Стильная прихожая с удобной системой хранения и прохладной современностью.',
    'Прихожая с продуманной логистикой и лаконичным дизайном.',
    'Уютная прихожая с фактурными элементами и практичной зоной хранения.',
  ],
}

const rangeOptions = {
  'design-projects': { area: [28, 38, 48], price: [250000, 320000, 390000], duration: ['22 дня', '24 дня', '28 дней'] },
  bathrooms: { area: [4.8, 6.2, 8.6, 9.4], price: [98000, 125000, 165000, 205000], duration: ['14 дней', '16 дней', '18 дней'] },
  livingrooms: { area: [16, 18, 21, 24], price: [135000, 170000, 205000], duration: ['20 дней', '22 дня', '24 дня'] },
  kitchens: { area: [12, 14, 18, 22], price: [185000, 225000, 275000, 320000], duration: ['20 дней', '24 дня', '28 дней'] },
  bedrooms: { area: [14, 16, 18, 20], price: [145000, 165000, 185000], duration: ['18 дней', '20 дней', '22 дня'] },
  entrances: { area: [6, 8, 10], price: [98000, 118000, 135000], duration: ['12 дней', '14 дней', '16 дней'] },
}

const getSeed = (value) =>
  value
    .split('')
    .reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0)

const pick = (seed, list) => list[Math.abs(seed) % list.length]

const getProjectMeta = (category, folder) => {
  const project = projectDetails[`${category}/${folder}`]
  if (project) {
    return {
      ...project,
      shortDescription: project.shortDescription || project.description.replace(/\.$/, ''),
    }
  }

  const seed = getSeed(`${category}-${folder}`)
  const jk = pick(seed, jkNames)
  const baseName = categoryTemplates[category] || folder.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  const title = `${baseName} в ЖК ${jk}`
  const details = rangeOptions[category] || rangeOptions.bathrooms
  const areaValue = pick(seed + 1, details.area)
  const priceValue = pick(seed + 2, details.price)
  const description = pick(seed + 3, projectDescriptionTemplates[category] || projectDescriptionTemplates.bathrooms)
  const shortDescription = description.replace(/\.$/, '')
  return {
    title,
    description,
    shortDescription,
    area: `${areaValue} м²`,
    price: `от ${priceValue.toLocaleString('ru-RU')} ₽`,
    duration: pick(seed + 4, details.duration),
  }
}

const getProjectTitle = (category, folderName) => {
  const meta = getProjectMeta(category, folderName)
  return meta.title
}

const imageModules = import.meta.glob('@/assets/images/portfolio/*/*/*.{jpg,jpeg,png}', { eager: true, as: 'url' })
const projects = Object.entries(imageModules)
  .map(([path, src]) => {
    const match = path.match(/portfolio\/([^/]+)\/([^/]+)\//)
    if (!match) {
      return null
    }

    return {
      path,
      src,
      category: match[1],
      folder: match[2],
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.path.localeCompare(b.path))
  .reduce((acc, { category, folder, src }) => {
    const key = `${category}/${folder}`
    if (!acc[key]) {
      acc[key] = {
        category,
        folder,
        title: getProjectTitle(category, folder),
        tag: folderTitleMap[category] || category,
        gallery: [],
      }
    }
    acc[key].gallery.push(src)
    return acc
  }, {})
const staticProjectList = Object.values(projects).map((project, index) => {
  const meta = getProjectMeta(project.category, project.folder)
  return {
    id: `static-${index + 1}`,
    ...project,
    image: project.gallery[0],
    title: meta.title,
    description: meta.description,
    shortDescription: meta.shortDescription,
    area: meta.area,
    price: meta.price,
    duration: meta.duration,
  }
})

const mapRemoteProject = (project) => {
  const gallery = (project.gallery || []).map(resolveMediaUrl)
  return {
    id: project.id,
    category: project.category,
    folder: project.id,
    title: project.title,
    tag: folderTitleMap[project.category] || project.category,
    gallery,
    image: gallery[0],
    description: project.description || project.shortDescription || '',
    shortDescription: project.shortDescription || project.description || '',
    area: project.area || '',
    price: project.price || '',
    duration: project.duration || '',
  }
}

export default function FinishingProjects({ showAll = false, hideHeading = false }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(showAll ? 4 : 4)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [remoteProjects, setRemoteProjects] = useState([])
  const modalRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    fetchProjects()
      .then((list) => {
        if (!cancelled) {
          setRemoteProjects(list.map(mapRemoteProject))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRemoteProjects([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const projectList = useMemo(
    () => [...remoteProjects, ...staticProjectList],
    [remoteProjects]
  )

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentIndex(0)
  }

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
        return
      }

      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => {
          const gallery = selectedProject.gallery || [selectedProject.image]
          return (prev - 1 + gallery.length) % gallery.length
        })
      }

      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => {
          const gallery = selectedProject.gallery || [selectedProject.image]
          return (prev + 1) % gallery.length
        })
      }

      if ([' ', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    pauseSmoothScroll(true)

    requestAnimationFrame(() => {
      modalRef.current?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      pauseSmoothScroll(false)
    }
  }, [selectedProject])

  useEffect(() => {
    if (showAll) {
      setVisibleCount(4)
    }
  }, [activeFilter, showAll])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projectList
    }

    return projectList.filter((project) => project.category === activeFilter)
  }, [activeFilter, projectList])

  const visibleProjects = showAll ? filteredProjects.slice(0, visibleCount) : filteredProjects.slice(0, 4)
  const hasMore = showAll && visibleCount < filteredProjects.length

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length))
  }

  return (
    <section className="bg-[#f8fafc] py-8 transition-colors duration-300 dark:bg-custom-grey sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideHeading && (
          <ScrollFadeInUp className="mb-6">
            <h2 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              Наши работы
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Наше портфолио - это реальные проекты, которые отражают качество нашей работы. Здесь вы найдете примеры дизайн-проектов, выполненных ремонтов и готовых интерьеров. Мы сопровождаем клиентов на каждом этапе: от идеи и разработки проекта до полной реализации и сдачи объекта.
            </p>
          </ScrollFadeInUp>
        )}
        <ScrollFadeInUp className="mb-6 overflow-x-auto pb-2 sm:mb-7 sm:pb-0">
          <div className="flex min-w-full gap-2 sm:flex-wrap">
            {projectFilters.map(({ id, label }) => {
              const isActive = activeFilter === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveFilter(id)}
                  className={`shrink-0 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:px-5 sm:text-sm ${
                    isActive
                      ? 'bg-custom-blue text-white shadow-sm dark:bg-custom-blue'
                      : 'bg-white text-slate-950 hover:bg-custom-blue hover:text-white dark:bg-transparent dark:text-slate-200 dark:hover:bg-custom-blue dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </ScrollFadeInUp>

        <ScrollStagger
          key={`${activeFilter}-${visibleCount}`}
          y={24}
          scale={1}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6"
        >
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-white/20 dark:bg-transparent sm:rounded-[1.75rem]"
            >
              <div className="relative overflow-hidden pt-[56.5%]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-sm dark:bg-slate-950/90 dark:text-white">
                  {project.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
                <h3 className="text-base font-semibold leading-snug text-slate-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {project.shortDescription}
                </p>
                {project.area || project.duration || project.price ? (
                  <div className="grid grid-cols-1 gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-3">
                    {project.area ? (
                      <div className="flex items-center gap-2 rounded-2xl px-3 py-2">
                        <FaRulerCombined className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                        <span>{project.area}</span>
                      </div>
                    ) : null}
                    {project.duration ? (
                      <div className="flex items-center gap-2 rounded-2xl px-3 py-2">
                        <FaRegCalendarAlt className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                        <span>{project.duration}</span>
                      </div>
                    ) : null}
                    {project.price ? (
                      <div className="flex items-center gap-2 rounded-2xl px-3 py-2">
                        <span className="font-semibold text-[14px] text-slate-950 dark:text-white">{project.price}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {/* Removed photos and stages info from card per request */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(project)
                    setCurrentIndex(0)
                  }}
                  className="mt-auto inline-flex w-full items-center justify-center rounded-lg border border-custom-blue bg-custom-blue px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-custom-blue/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 dark:border-custom-blue dark:bg-custom-blue dark:hover:bg-custom-blue"
                >
                  ПОДРОБНЕЕ
                </button>
              </div>
            </div>
          ))}
        </ScrollStagger>

        {selectedProject && createPortal(
          <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-slate-950/70 md:backdrop-blur-sm" role="presentation">
            <button
              type="button"
              className="absolute inset-0 min-h-full w-full cursor-pointer"
              onClick={closeModal}
              aria-label="Закрыть окно"
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label={selectedProject.title}
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
                className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[1.25rem] bg-white shadow-2xl outline-none touch-pan-y dark:bg-slate-900 md:h-[70dvh] md:max-h-[760px]"
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-semibold text-slate-950 transition hover:bg-white dark:bg-slate-800 dark:text-white"
                  aria-label="Закрыть"
                >
                  ×
                </button>
                <div className="grid max-h-[85dvh] grid-cols-1 overflow-y-auto md:flex md:h-full md:max-h-none md:overflow-hidden md:items-stretch">
                  <div className="relative bg-black/5 dark:bg-slate-800 md:flex md:h-full md:min-h-0 md:w-1/2 md:flex-col">
                    <div className="relative flex h-64 items-center justify-center bg-slate-100 dark:bg-slate-800 sm:h-72 md:h-auto md:min-h-0 md:flex-1">
                      {(() => {
                        const gallery = selectedProject.gallery || [selectedProject.image]
                        return (
                          <img
                            src={gallery[currentIndex]}
                            alt={`${selectedProject.title} ${currentIndex + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )
                      })()}
                      <button
                        type="button"
                        onClick={() => {
                          const gallery = selectedProject.gallery || [selectedProject.image]
                          setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
                        }}
                        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:bg-white"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const gallery = selectedProject.gallery || [selectedProject.image]
                          setCurrentIndex((prev) => (prev + 1) % gallery.length)
                        }}
                        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:bg-white"
                        aria-label="Next image"
                      >
                        <FaChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-3 sm:grid-cols-5">
                      {(() => {
                        const gallery = selectedProject.gallery || [selectedProject.image]
                        return gallery.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setCurrentIndex(i)}
                            className={`h-12 w-full overflow-hidden rounded-md border sm:h-14 ${
                              i === currentIndex ? 'ring-2 ring-custom-blue' : 'border-transparent'
                            }`}
                          >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                          </button>
                        ))
                      })()}
                    </div>
                  </div>
                  <div className="space-y-4 p-6 md:h-full md:w-1/2 md:overflow-y-auto">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-blue">
                        {selectedProject.tag}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
                        {selectedProject.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="inline-flex items-center gap-2">
                          <FaRulerCombined className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span>{selectedProject.area}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <FaRegCalendarAlt className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span>{selectedProject.duration}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {selectedProject.price}
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        , document.body)}

        {!showAll && (
          <ScrollFadeInUp className="mt-8 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-custom-blue bg-custom-blue px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-custom-blue/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 dark:border-custom-blue dark:bg-custom-blue dark:hover:bg-custom-blue"
            >
              Посмотреть все проекты
            </Link>
          </ScrollFadeInUp>
        )}

        {hasMore && (
          <ScrollFadeInUp className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleShowMore}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-custom-blue bg-custom-blue px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-custom-blue/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 dark:border-custom-blue dark:bg-custom-blue dark:hover:bg-custom-blue"
            >
              Показать ещё работы
              <FaChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </ScrollFadeInUp>
        )}
      </div>
    </section>
  )
}
