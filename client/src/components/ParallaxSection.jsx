import { Parallax } from '@/components/AnimatedElements'

export { Parallax, ParallaxFrame } from '@/components/AnimatedElements'

export default function ParallaxSection({ children, backgroundImage, speed = 0.28, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgroundImage ? (
        <Parallax
          speed={speed}
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
