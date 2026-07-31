import { ScrollFadeInUp } from '@/components/AnimatedElements'

export default function Intro() {
    return (
        <section className="bg-[#f8fafc] py-12 transition-colors duration-300 dark:bg-custom-grey sm:py-16 md:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ScrollFadeInUp className="text-center space-y-4 sm:space-y-6" start="top 90%">
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-custom-blue dark:text-white leading-tight">
                        Ваш идеальный переезд начинается с профессиональной приемки квартиры!
                    </p>  
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Начните новую главу своей жизни комфортно и уверенно — доверьте приёмку профессионалам.
                    </p>
                </ScrollFadeInUp>
            </div>
        </section>
    )
}
