import React, { FC } from 'react'
import styles from './index.module.scss'
import carIcon from '@/assets/images/car.png'
import { observer } from 'mobx-react-lite'
import fareStore from '../store'
const PreviewMap: FC = () => {
  const { formData } = fareStore
  return (
    <div className={styles.previewMap}>
      <div className={styles.content} id="ZYR">
        {formData?.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.time}>
              <span>
                <img className={styles.carIcon} src={carIcon}></img>
              </span>
              <span className={styles.text}>{item?.time}</span>
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
                  <span className={styles.unit}>km</span>
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
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>平均速度</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.maxSpend}</span>
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>最快速度</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.expectedOil}</span>
                  <span className={styles.unit}>元</span>
                </span>
                <span>预估油费</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(PreviewMap)
