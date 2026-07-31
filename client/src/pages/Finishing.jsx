import AppFooter from '@/components/Общие/AppFooter/AppFooter'
import FinishingHero from '@/components/Отделка/FinishingHero/FinishingHero'
import FinishingIntro from '@/components/Отделка/FinishingIntro/FinishingIntro'
import FinishingServices from '@/components/Отделка/FinishingServices/FinishingServices'
import FinishingWorkflow from '@/components/Отделка/FinishingWorkflow/FinishingWorkflow'
import FinishingProjects from '@/components/Отделка/FinishingProjects/FinishingProjects'
import FinishingLeadForm from '@/components/Отделка/FinishingLeadForm/FinishingLeadForm'

export default function Finishing() {
  return (
    <main className="min-h-screen">
      <FinishingHero />
      <FinishingIntro />
      <FinishingServices />
      <FinishingWorkflow />
      <FinishingProjects />
      <FinishingLeadForm />
      <AppFooter />
    </main>
  )
}
