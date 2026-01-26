import withoutFinishing from '@/assets/images/без отделки.jpeg'
import withFinishing from '@/assets/images/с отделкой.jpg'
import repeat from '@/assets/images/повторная.jpg'
import repeat_2 from '@/assets/images/повторная2.jpg'
export default function Services() {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-custom-blue dark:text-white leading-tight text-center mb-8 sm:mb-12">Наши услуги</h3>  
                <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
                        <img src={withoutFinishing} className="w-full h-auto rounded-lg shadow-lg order-1 lg:order-1" alt="Без отделки" />
                        <div className="flex flex-col justify-start space-y-4 order-2 lg:order-2">
                            <h5 className="text-2xl sm:text-3xl md:text-4xl text-start font-normal text-custom-blue dark:text-white">Предчистовая отделка </h5>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                Эта услуга включает проверку качества строительства и соответствия квартиры заявленным характеристикам застройщика. Специалисты проверяют:
                            </p>
                            <ul className='list-disc list-inside text-start space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                                <li>Соответствие площади проектной документации.</li>
                                <li>Качество стен, потолков и полов (вертикальность, горизонтальность, отсутствие трещин, отслоений).</li>
                                <li>Исправность окон и дверей.</li>
                                <li>Работу инженерных коммуникаций (водоснабжение, отопление, электрика, вентиляция).</li>
                                <li>Отсутствие дефектов конструкции здания.</li>
                            </ul>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
                            </p>
                             <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                *Дополнительная услуга к приёмке - тепловизионный осмотр +2500₽
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">Студия/2500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная/3000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная+/3500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная/4000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная+/4500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная/5000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная+/5500₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
                        <div className="flex flex-col justify-start space-y-4 order-2 lg:order-1">
                            <h5 className="text-2xl sm:text-3xl md:text-4xl text-start font-normal text-custom-blue dark:text-white">Чистовая отделка </h5>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                               При приеме квартиры с отделкой дополнительно проверяется качество выполненных отделочных работ. Здесь специалисты обращают внимание на:
                            </p>
                            <ul className='list-disc list-inside text-start space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300'>
                                <li>Качество материалов отделки (обои, плитка, напольные покрытия, стены).</li>
                                <li>Правильность укладки плитки, настила пола, поклейки обоев.</li>
                                <li>Работоспособность сантехники, осветительных приборов, розеток и выключателей.</li>
                                <li>Функционирование встроенной мебели и оборудования (если предусмотрено проектом).</li>
                            </ul>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
                            </p>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                *Дополнительная услуга к приёмке - тепловизионный осмотр +2500₽
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">Студия/3000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная/3500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная+/4000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная/4500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная+/5000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная/5500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная+/6000₽</span>
                            </div>
                        </div>
                        <img src={withFinishing} className="w-full h-auto rounded-lg shadow-lg order-1 lg:order-2" alt="С отделкой" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
                        <img src={repeat} className="w-full h-auto rounded-lg shadow-lg order-1 lg:order-1" alt="Повторная приемка" />
                        <div className="flex flex-col justify-start space-y-4 order-2 lg:order-2">
                            <h5 className="text-2xl sm:text-3xl md:text-4xl text-start font-normal text-custom-blue dark:text-white">Повторная приемка (предчистовая отделка)</h5>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                Иногда возникают ситуации, когда первичный осмотр выявляет серьезные дефекты, требующие повторного визита специалиста. Повторная приемка проводится после устранения всех выявленных ранее недостатков застройщиком. Она необходима для подтверждения исправления проблем и подготовки акта приема-передачи недвижимости. 
                            </p>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">Студия/1250₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная/1500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная+/1750₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная/2000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная+/2250₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная/2500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная+/2750₽</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
                        <div className="flex flex-col justify-start space-y-4 order-2 lg:order-1">
                            <h5 className="text-2xl sm:text-3xl md:text-4xl text-start font-normal text-custom-blue dark:text-white">Повторная приемка <br /> (чистовая отделка)</h5>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                Иногда возникают ситуации, когда первичный осмотр выявляет серьезные дефекты, требующие повторного визита специалиста. Повторная приемка проводится после устранения всех выявленных ранее недостатков застройщиком. Она необходима для подтверждения исправления проблем и подготовки акта приема-передачи недвижимости. 
                            </p>
                            <p className='text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">Студия/1500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная/1750₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">1 комнатная+/2000₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная/2250₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">2 комнатная+/2500₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная/2750₽</span>
                                <span className="text-sm sm:text-base text-start text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">3 комнатная+/3000₽</span>
                            </div>
                        </div>
                        <img src={repeat_2} className="w-full h-auto rounded-lg shadow-lg order-1 lg:order-2" alt="Повторная приемка" />
                    </div>

                </div>
            </div>
        </section>
    )
}