import styles from './dashboard.module.css'
import { EagleMascot } from '@/components/ui/candy'
import type { HeroBannerData } from './types'

interface HeroBannerProps {
  data: HeroBannerData
}

export function HeroBanner({ data }: HeroBannerProps) {
  return (
    <div className={styles['hero-banner']}>
      <div className={styles['hb-content']}>
        <div>
          <div className={styles['hb-greet']}>{data.greeting}</div>
          <div className={styles['hb-sub']}>{data.subtitle}</div>
        </div>
        <div className={styles['hb-mascot']}>
          <EagleMascot variant="hero" />
        </div>
      </div>
    </div>
  )
}
