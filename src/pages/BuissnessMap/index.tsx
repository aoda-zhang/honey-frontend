import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import moment from 'moment'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { MAX_AVE_SPEED, MAX_SPEED, MIN_AVE_SPEED, MIN_SPEED } from 'src/constants'
import { HospatialType } from '../Hospital'
export interface BMap {
  time: string
  from: string
  to: string
  allMileage?: number
  spendTime: number
  average?: number
  maxSpend?: number
}
type FormValue = { bMap: BMap[] }

const BusinessMap: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [hospatial, setHospatial] = useState<any[]>([])
  useEffect(() => {
    const hos: HospatialType[] = JSON.parse(localStorage.getItem('animalHospatial')) ?? []
    const options = hos.map(item => ({ label: item.name, value: item.name }))
    setHospatial(() => [...options])
  }, [])
  const onFinish = (value: FormValue) => {
    const BMapList = value.bMap.map(item => {
      const average = Math.floor(
        Math.random() * (MAX_AVE_SPEED - MIN_AVE_SPEED + 1) + MIN_AVE_SPEED
      )
      return {
        time: moment(item.time).format('YYYY.MM.DD HH:mm'),
        from: item.from,
        to: item.to,
        spendTime: item.spendTime,
        average,
        maxSpend: Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED),
        allMileage: Math.round(average * (item.spendTime / 60))
      }
    })
    navigate('/previewMap', { state: BMapList })
  }
  return (
    <div className={styles.form}>
      <Form name="basic" onFinish={onFinish} autoComplete="true" form={form}>
        <Form.List name="bMap">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 4 }} align="baseline">
                  <Form.Item
                    {...restField}
                    label="出发时间"
                    name={[name, 'time']}
                    rules={[{ required: true, message: '请输入出发时间' }]}
                  >
                    <DatePicker
                      placeholder="请选择出发时间"
                      format="YYYY-MM-DD HH:mm"
                      showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="出发地点"
                    name={[name, 'from']}
                    rules={[{ required: true, message: '请输入出发地点' }]}
                  >
                    <Input placeholder="请填写出发地点" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="到达医院"
                    name={[name, 'to']}
                    rules={[{ required: true, message: '请输入到达地点' }]}
                  >
                    <Select
                      allowClear
                      size="large"
                      showSearch
                      placeholder="请选择到达医院"
                      optionFilterProp="children"
                      options={hospatial}
                    />
                    {/* <Input placeholder="请填写到达医院" /> */}
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="驾驶时间"
                    name={[name, 'spendTime']}
                    rules={[{ required: true, message: '请输入驾驶分钟数' }]}
                  >
                    <Input type="number" placeholder="请填写驾驶分钟数" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加新的报销行程
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate('/hospital')
              }}
            >
              编辑宠物医院
            </Button>
            <Button type="primary" htmlType="submit">
              预览报销地图
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BusinessMap
