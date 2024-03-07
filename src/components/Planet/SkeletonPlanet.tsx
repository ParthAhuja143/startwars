import styles from './Planet.module.css'
import { Skeleton } from '@mui/material'

const SkeletonPlanet = () => {
    return (
      <div className={styles.assessment}>
        <div className={styles.assessment__header}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={40} height={40} />
        </div>
        <Skeleton variant="text" width={150} height={30} />
        <div className={styles.assessment__desc}>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={120} height={20} />
        </div>
        <div className={styles.assessment_overview_box_no_border}>
          <Skeleton variant="text" width={120} height={20} />
          <div className={styles.assessment_overview_stat}>
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={80} height={20} />
          </div>
        </div>
        <div className={styles.assessment__footer}>
          <Skeleton variant="text" width={100} height={20} />
          <div>
            <div className={styles.assessment__footer__div}>
              <Skeleton variant="text" width={40} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </div>
            <div className={styles.assessment__footer__div}>
              <Skeleton variant="text" width={40} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </div>
            <div className={styles.assessment__footer__div}>
              <Skeleton variant="text" width={40} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  export {SkeletonPlanet}