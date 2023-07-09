import React, { FC, memo, useEffect, useState } from 'react'
import welcomeIMG from '@/assets/images/welcome.png'
import styles from './index.module.scss'
import envConfig from '@/config/env'
import { Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'
import storage from '@/shared/utils/storage'
const Welcome: FC = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [isAuthed, setIsAuthed] = useState(false)
  useEffect(() => {
    const secretCode = sha256(storage.get('authKey'))?.toString()
    if (secretCode === envConfig?.auth?.authCode) {
      setIsAuthed(true)
      navigate('/businessMap')
    } else {
      setIsAuthed(false)
      messageApi.open({
        type: 'error',
        content: envConfig?.auth?.noAuthMessage
      })
    }
  }, [])
  const onPressEnter = e => {
    const authCode = e?.target?.value
    const secretCode = sha256(authCode)?.toString()
    if (secretCode === envConfig?.auth?.authCode) {
      storage.set('authKey', authCode)
      navigate('/businessMap')
    } else {
      messageApi.open({
        type: 'error',
        content: envConfig?.auth?.noAuthMessage
      })
    }
  }
  return (
    <>
      {contextHolder}
      <div className={styles.welcome}>
        <img src={welcomeIMG} alt="" />
        {isAuthed && <div className={styles.message}>{envConfig.welcomeMessage}</div>}
        {!isAuthed && (
          <div className={styles.auth}>
            <div>{envConfig?.auth?.inputAuthCode}</div>
            <Input placeholder="Please input auth code" onPressEnter={onPressEnter} />
          </div>
        )}
      </div>
    </>
  )
}
export default memo(Welcome)
