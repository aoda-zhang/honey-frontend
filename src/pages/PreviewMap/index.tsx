import { BMap } from '../BuissnessMap'
import styles from './index.module.scss'
import carIcon from '../../assets/images/car.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import translateTime from 'src/utils/translateTime'

const PreviewMap = () => {
  const location = useLocation()
  const [list, setList] = useState<BMap[]>([])
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setList(() => [...(location.state ? location.state : [])])
  }, [location.state])

  return (
    <div className={styles.previewMap}>
      <div className={styles.content}>
        {list.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.time}>
              <span>
                <img className={styles.carIcon} src={carIcon}></img>
              </span>
              <span>{item?.time}</span>
            </div>
            <div className={styles.address}>
              <span className={styles.icon}>
                <span className={styles.redC}></span>
                <span className={styles.borderC}></span>
                <span className={styles.greenC}></span>
              </span>
              <span className={styles.name}>
                <span>{item?.from}</span>
                <span>{item?.to}</span>
              </span>
            </div>
            <div className={styles.spendTime}>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.allMileage}</span>
                  <span>km</span>
                </span>
                <span>导航里程</span>
              </span>
              <span className={styles.column}>
                <span className={styles.value}>{item?.spendTime}</span>
                <span>驾驶时长</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.average}</span>
                  <span>km/h</span>
                </span>
                <span>平均速度</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.maxSpend}</span>
                  <span>km/h</span>
                </span>
                <span>最快速度</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviewMap
