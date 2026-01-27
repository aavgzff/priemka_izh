import heroImage from '@/assets/images/intro image.jpg'

export default function Hero() {

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Контент */}
          <div className="flex flex-col items-start justify-center space-y-4 sm:space-y-6 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-custom-blue dark:text-white">
              Услуги по приемке{' '}
              <span className="text-custom-blue dark:text-blue-400">квартир в новостройках</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Проверка квартиры перед подписанием акта приема-передачи
            </p>
            
            <a 
                href="#footer"
                className="mt-4 sm:mt-6 inline-flex items-center justify-center rounded-full bg-custom-blue hover:bg-custom-blue/90 px-6 sm:px-8 py-3 sm:py-3.5 text-white font-medium text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
              Оставить заявку 
            </a>
          </div>
          
          {/* Изображение */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <img
              src={heroImage}
              alt="Приёмка квартир"
              className="w-full h-auto max-w-lg lg:max-w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}