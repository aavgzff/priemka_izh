import { useRef } from 'react'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Intro from '@/components/Intro/Intro'
import AboutUs from '@/components/AboutUs/AboutUs'
import Services from '@/components/Services/Services'
import SectionImg from '@/components/SectionImg/SectionImg'
import Questions from '@/components/Questions/Questions'
import SiteFooter from '@/components/Footer/Footer'

export default function Home() {
  const footerRef = useRef(null)

  const onContactsClick = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onContactsClick={onContactsClick} />
      <Hero />
      <Intro />
      <AboutUs />
      <Services />
      <SectionImg />
      <Questions />
      <SiteFooter footerRef={footerRef} />
    </div>
  )
}
