import React, { FC, memo, useEffect } from 'react'
import welcomeIMG from '@/shared/assets/images/welcome.png'
import styles from './index.module.scss'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
const Welcome: FC = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    navigate('/fare')
  }, [navigate])
  return (
    <>
      {contextHolder}
      <div className={styles.welcome}>
        <img src={welcomeIMG} alt="" />
      </div>
    </>
  )
}
export default memo(Welcome)
