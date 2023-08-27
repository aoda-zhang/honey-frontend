import React, { FC, memo, useEffect, useState } from 'react'
import welcomeIMG from '@/shared/assets/images/welcome.png'
import styles from './index.module.scss'
import envConfig from '@/config/env'
import { Input, Spin, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'
import storage from '@/shared/utils/storage'
import addressAPI from '../Fare/apis'
import globalStore from '@/shared/store/globalStore'
const Welcome: FC = () => {
  const { setAddress } = globalStore
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)
  const [messageApi, contextHolder] = message.useMessage()
  const [isAuthed, setIsAuthed] = useState(false)
  useEffect(() => {
    const fetchData = () => {
      addressAPI
        .getAddressList()
        .then(data => {
          const addressList = data?.map(item => ({
            label: item?.name,
            value: item?.name
          }))
          setAddress(addressList)
          navigate('/fare')
        })
        .finally(() => {
          setLoading(false)
        })
    }
    const secretCode = sha256(storage.get('authKey'))?.toString()
    if (secretCode === envConfig?.auth?.authCode) {
      setIsAuthed(true)
      fetchData()
    } else {
      setIsAuthed(false)
      messageApi.open({
        type: 'error',
        content: envConfig?.auth?.noAuthMessage
      })
    }
  }, [messageApi, navigate, setAddress])
  const onPressEnter = e => {
    const authCode = e?.target?.value
    const secretCode = sha256(authCode)?.toString()
    if (secretCode === envConfig?.auth?.authCode) {
      storage.set('authKey', authCode)
      navigate('/fare')
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
        {isAuthed && <Spin size="large" spinning={isLoading}></Spin>}
      </div>
    </>
  )
}
export default memo(Welcome)
