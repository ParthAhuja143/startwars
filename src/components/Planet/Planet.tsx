
import styles from './Planet.module.css'
import { IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import WhatshotSharpIcon from '@mui/icons-material/WhatshotSharp';
import CloudSharpIcon from '@mui/icons-material/CloudSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import { SkeletonPlanet } from './SkeletonPlanet';

const Planet = ({ref, data, handleMouseLeave, handleMouseOver, setCurrentPlanet}: any) => {

  if(!data){
    return <SkeletonPlanet />
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} ref={ref} className={styles.assessment}>
        <div className={styles.assessment__header}>
            <span  className={styles.assessment__icon}>
                <WhatshotSharpIcon style={{color: 'white'}}/>
            </span>
            <span className={styles.assessment_more}>
                <IconButton>
                <MoreVert />
                </IconButton>
            </span>
        </div>
        <h4>
            {data.name}
        </h4>
        <div className={styles.assessment__desc}>
            <span className={styles.assessment__date}>
                <PeopleAltSharpIcon style={{
                    margin: '0 5px'
                }} />
                <span>{data.population}</span>
            </span>
            <span className={styles.assessment__date}>
                <CloudSharpIcon style={{
                    margin: '0 5px'
                }} />
                <span>{data.climate}</span>
            </span>
        </div>
        <div className={styles.assessment_overview_box_no_border}>
        <p className={styles.assessment_overview_title}>DETAILS</p>
        <div className={styles.assessment_overview_stat}>
          <div className={styles.assessment_overview_sub_box_border}>
            <div className={styles.assessment_stat_box}>
              <p className={styles.assessment_overview_number}>{data.rotation_period}</p>
            </div>
            <p className={styles.assessment_sub}>Rotation Period</p>
          </div>
          <div className={styles.assessment_overview_sub_box_border}>
            <div className={styles.assessment_stat_box}>
              <p className={styles.assessment_overview_number}>{data.orbital_period}</p>
            </div>
            <p className={styles.assessment_sub}>Orbital Period</p>
          </div>
          <div className={styles.assessment_overview_sub_box}>
            <div className={styles.assessment_stat_box}>
              <p className={styles.assessment_overview_number}>{data.surface_water}</p>
            </div>
            <p className={styles.assessment_sub}>Surface Water</p>
          </div>
        </div>
      </div>
        <div className={styles.assessment__footer}>
            <div>
            <div className={styles.assessment__footer__div}>
                <p className={styles.assessment__footer_p}>{data.residents.length}</p>
                <sub className={styles.assessment__footer_sub}>Residents</sub>
            </div>
            <div className={styles.assessment__footer__div}>
                <p className={styles.assessment__footer_p}>{data.films.length}</p>
                <sub className={styles.assessment__footer_sub}>Films</sub>
            </div>
            </div>
            {data.residents.length > 0 && <div className={styles.assessment__footer__right}>
                <button className={styles.assessment_button} style={{zIndex: 10}} onClick={() => setCurrentPlanet(data)}>
                    See residents
                </button>
            </div>}
        </div>
        <p className={styles.assessment__footer_p}>{data.terrain}</p>
        <sub className={styles.assessment__footer_sub}>Terrain</sub>
      </div>
  )
}

export default Planet