import { Drawer } from 'antd'
import React, { FC } from 'react'
import fareStore from '../store'
import styles from './index.module.scss'
type Props = {
  isOpen: boolean
  onClose: () => void
}
const Info: FC<Props> = props => {
  const { isOpen, onClose } = props
  const { faredDate, getFaredAddress, getRepeatAddress } = fareStore
  return (
    <Drawer
      title="本次报销详情"
      placement="bottom"
      closable={true}
      onClose={onClose}
      open={isOpen}
      key="bottom"
      className={styles.info}
    >
      <div>
        <p className={styles.title}>已报销的日期</p>
        <p className={styles.values}>
          {faredDate?.map((item, i) => (
            <span key={i} className={styles.val}>
              {item}
            </span>
          ))}
        </p>
      </div>
      <div>
        <p className={styles.title}>本次报销的医院</p>
        <p className={styles.values}>
          {getFaredAddress?.map((item, i) => (
            <span key={i} className={styles.val}>
              {item}
            </span>
          ))}
        </p>
      </div>
      <div>
        <p className={styles.title}>重复报销的医院</p>
        <p className={styles.values}>
          {getRepeatAddress?.map((item, i) => (
            <p key={i} className={styles.val}>
              <span>重复日期：{item?.time}</span>
              {'   '}
              <span>重复地址：{item?.to}</span>
            </p>
          ))}
        </p>
      </div>
    </Drawer>
  )
}
export default Info
