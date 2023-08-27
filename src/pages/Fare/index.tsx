import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import BusinessMap from './BuissnessMap'
import PreviewMap from './PreviewMap'
import { Button, Form, message, Input } from 'antd'
import { AVE_OIL, MAX_AVE_SPEED, MIN_AVE_SPEED, NO_DATA_MESSAGE } from '@/shared/constants'
import { FormValue } from './types'
import styles from './index.module.scss'
import fareStore from './store'
import Info from './Info'
const Fare: FC = () => {
  const { setForm, setDate } = fareStore
  const [form] = Form.useForm()
  const [status, setStatus] = useState({
    isEdit: true,
    isView: false,
    isInfoOpen: false
  })
  const onFinish = (value: FormValue) => {
    const formData = value?.bMap?.map(item => {
      const average = Math.floor(Math.random() * MAX_AVE_SPEED + MIN_AVE_SPEED)
      const MAX_SPEED = average + 30
      return {
        time: `${value?.spendDate} ${item?.time}`,
        from: item.from,
        to: item.to,
        spendTime: item?.spendTime,
        average,
        maxSpend: Math.floor(Math.random() * (MAX_SPEED - average + 1) + average),
        allMileage: item?.allMileage,
        expectedOil: (item?.allMileage * AVE_OIL)?.toFixed(2)
      }
    })
    const BMapList = formData?.sort((c, b) => +dayjs(b.time)?.valueOf() - +dayjs(c.time)?.valueOf())
    if (BMapList?.length > 0) {
      setForm(BMapList)
      setDate(value?.spendDate)
      setStatus({ ...status, isEdit: false, isView: true })
    } else {
      message.error(NO_DATA_MESSAGE)
    }
  }
  return (
    <div className={styles.fare}>
      <Form name="basic" onFinish={onFinish} autoComplete="true" form={form}>
        {status.isEdit && (
          <Form.Item
            label="本次报销月份"
            name="spendDate"
            rules={[{ required: true, message: '请填写本次报销的月份' }]}
            className={styles.spendDate}
          >
            <Input placeholder="示例 2023.08.23" />
          </Form.Item>
        )}

        {status.isEdit && <BusinessMap />}
        {status.isView && <PreviewMap />}
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
                setStatus({
                  ...status,
                  isInfoOpen: true
                })
              }}
            >
              Info
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                setStatus({ ...status, isEdit: true, isView: false })
              }}
            >
              Edit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Info
        isOpen={status.isInfoOpen}
        onClose={() => {
          setStatus({ ...status, isInfoOpen: false })
        }}
      ></Info>
    </div>
  )
}
export default Fare
