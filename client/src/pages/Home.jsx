import SiteFooter from '@/components/Общие/Footer/Footer'
import AppFooter from '@/components/Общие/AppFooter/AppFooter'
import Hero from '@/components/Приемка/Hero/Hero'
import Intro from '@/components/Приемка/Intro/Intro'
import AboutUs from '@/components/Приемка/AboutUs/AboutUs'
import Services from '@/components/Приемка/Services/Services'
import SectionImg from '@/components/Приемка/SectionImg/SectionImg'
import Questions from '@/components/Приемка/Questions/Questions'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] transition-colors duration-300 dark:bg-custom-grey">
      <Hero />
      <Intro />
      <AboutUs />
      <Services />
      <SectionImg />
      <Questions />
      <SiteFooter />
      <AppFooter />
    </div>
  )
}
