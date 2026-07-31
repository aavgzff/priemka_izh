import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  buildJsonLd,
  getRouteSeo,
  getSiteUrl,
} from '@/seo/config'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(data) {
  const id = 'seo-jsonld'
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const siteUrl = getSiteUrl()
    const seo = getRouteSeo(pathname)
    const canonical = `${siteUrl}${seo.path}`
    const imageUrl = `${siteUrl}${DEFAULT_OG_IMAGE}`

    document.title = seo.title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: seo.description,
    })

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: seo.noindex ? 'noindex, nofollow' : 'index, follow',
    })

    upsertLink('canonical', canonical)

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ru_RU' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.description,
    })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })

    if (!seo.noindex) {
      upsertJsonLd(buildJsonLd(siteUrl))
    }
  }, [pathname])

  return null
}
