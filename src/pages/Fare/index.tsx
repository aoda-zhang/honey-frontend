import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import BusinessMap from './BuissnessMap'
import PreviewMap from './PreviewMap'
import { Button, Form, message } from 'antd'
import { AVE_OIL, MAX_AVE_SPEED, MIN_AVE_SPEED, NO_DATA_MESSAGE } from '@/shared/constants'
import { FormValue } from './types'
import styles from './index.module.scss'
import fareStore from './store'
const Fare: FC = () => {
  const { setForm } = fareStore
  const [form] = Form.useForm()
  const [status, setStatus] = useState({
    isEdit: true,
    isView: false
  })
  const onFinish = (value: FormValue) => {
    const formData = value?.bMap?.map(item => {
      const average = Math.floor(Math.random() * MAX_AVE_SPEED + MIN_AVE_SPEED)
      const MAX_SPEED = average + 30
      return {
        time: item?.time,
        from: item.from,
        to: item.to,
        spendTime: item.spendTime,
        average,
        maxSpend: Math.floor(Math.random() * (MAX_SPEED - average + 1) + average),
        allMileage: item?.allMileage,
        expectedOil: (item?.allMileage * AVE_OIL)?.toFixed(2)
      }
    })
    const BMapList = formData?.sort((c, b) => +dayjs(b.time)?.valueOf() - +dayjs(c.time)?.valueOf())
    if (BMapList?.length > 0) {
      const viewStatus = {
        isEdit: false,
        isView: true
      }
      setForm(BMapList)
      setStatus(viewStatus)
    } else {
      message.error(NO_DATA_MESSAGE)
    }
  }
  return (
    <div className={styles.fare}>
      <Form name="basic" onFinish={onFinish} autoComplete="true" form={form}>
        {status.isEdit && <BusinessMap></BusinessMap>}
        {status.isView && <PreviewMap></PreviewMap>}
        <div className={styles.buttons}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              View
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                const editStatus = {
                  isEdit: true,
                  isView: false
                }
                setStatus(editStatus)
              }}
            >
              Edit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
export default Fare
