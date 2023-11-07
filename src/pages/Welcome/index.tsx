import React, { FC, memo, useEffect, useState } from 'react'
import welcomeIMG from '@/shared/assets/images/welcome.png'
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
  // const verifyAuth = (target: string) => {
  //   const secretCode = sha256(
  //     `${sha256(target)?.toString()}${envConfig?.auth?.secritySaltCode}`
  //   )?.toString()
  //   return secretCode === envConfig?.auth?.authCode
  // }

  useEffect(() => {
    // const secretCode = storage.get('authKey')
    navigate('/fare')
    // if (verifyAuth(secretCode)) {
    //   setIsAuthed(true)
    //   navigate('/fare')
    // } else {
    //   setIsAuthed(false)
    //   messageApi.open({
    //     type: 'error',
    //     content: envConfig?.auth?.noAuthMessage
    //   })
    // }
  }, [navigate])
  // const onPressEnter = e => {
  //   const authCode = e?.target?.value
  //   // if (verifyAuth(authCode)) {
  //   //   storage.set('authKey', authCode)
  //   // } else {
  //   //   messageApi.open({
  //   //     type: 'error',
  //   //     content: envConfig?.auth?.noAuthMessage
  //   //   })
  //   // }
  // }
  return (
    <>
      {contextHolder}
      <div className={styles.welcome}>
        <img src={welcomeIMG} alt="" />
        {/* {isAuthed && (
          <div className={styles.message}>{envConfig.welcomeMessage}</div>
        )}
        {!isAuthed && (
          <div className={styles.auth}>
            <div>{envConfig?.auth?.inputAuthCode}</div>
            <Input
              placeholder="Please input auth code"
              onPressEnter={onPressEnter}
            />
          </div>
        )} */}
      </div>
    </>
  )
}
export default memo(Welcome)
