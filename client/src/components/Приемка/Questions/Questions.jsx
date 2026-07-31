import questionsImg from '@/assets/images/3d.png'
import { ScrollSlideInLeft, ScrollSlideInRight } from '@/components/AnimatedElements'

export default function Questions() {
    return (
        <section className="relative z-10 bg-[#f8fafc] py-12 transition-colors duration-300 dark:bg-custom-grey sm:py-16 md:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
                    <ScrollSlideInLeft className="bg-custom-blue text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg flex flex-col items-start space-y-4 sm:space-y-6 order-2 lg:order-1">
                        <h5 className="text-2xl sm:text-3xl md:text-4xl leading-tight">Остались вопросы?</h5>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                            Если у вас возникли вопросы относительно приемки квартиры или процесса сдачи-приемки недвижимости, наши специалисты готовы оперативно проконсультировать вас и оказать необходимую помощь. Для нас важен индивидуальный подход к каждому клиенту, ведь каждая квартира уникальна, как и ваши ожидания от будущего жилья. Свяжитесь с нами удобным способом, и мы подберем оптимальный вариант решения всех вопросов, связанных с приемом вашей будущей квартиры.
                        </p>
                        <a href="#lead-form" className="mt-4 inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-50 text-custom-blue px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Связаться с нами
                        </a>
                    </ScrollSlideInLeft>
                    <ScrollSlideInRight className="order-1 lg:order-2 flex items-center justify-center">
                        <img src={questionsImg} alt="Вопросы" className="h-auto w-full max-w-md object-contain lg:max-w-full" />
                    </ScrollSlideInRight>
                </div>
            </div>
        </section>
    )
}
