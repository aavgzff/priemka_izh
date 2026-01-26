import sectionImg from '@/assets/images/section-img.jpg'

export default function SectionImg() {
  return (
    <section className="relative w-full">
      <div
        className="
          w-full
          h-[300px]
          sm:h-[400px]
          md:h-[500px]
          lg:h-[600px]
          flex
          items-center
          justify-center
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${sectionImg})`,
        }}
      >
        {/* контент */}
      </div>
    </section>
  )
}
