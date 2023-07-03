import React from 'react'
import { Button, Form, Input, Select, Space, message } from 'antd'
import 'moment/locale/zh-cn'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { MAX_AVE_SPEED, MIN_AVE_SPEED, NO_DATA_MESSAGE, AVE_OIL } from 'src/constants'
import HOSPITAL from '../../constants/hospital'
export interface BMap {
  // 出发时间
  time: string
  // 出发地点
  from: string
  // 到达地点
  to: string
  // 总里程
  allMileage: number
  // 花费时间
  spendTime: number
  // 平均速度
  average?: number
  // 最大速度
  maxSpend?: number
  // 预估油费
  expectedOil: number
}
type FormValue = { bMap: BMap[] }

const BusinessMap: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = (value: FormValue) => {
    const BMapList = value?.bMap?.map(item => {
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
    if (BMapList?.length > 0) {
      navigate('/previewMap', { state: BMapList })
    } else {
      message.error(NO_DATA_MESSAGE)
    }
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
                    <Input placeholder="示例 2023.06.25 16:24" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="出发地点"
                    name={[name, 'from']}
                    rules={[{ required: true, message: '请输入出发地点' }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      size="large"
                      mode="tags"
                      placeholder="请选择出发医院"
                      optionFilterProp="children"
                      options={HOSPITAL}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="到达医院"
                    name={[name, 'to']}
                    rules={[{ required: true, message: '请输入到达地点' }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      size="large"
                      mode="tags"
                      placeholder="请选择到达医院"
                      optionFilterProp="children"
                      options={HOSPITAL}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="驾驶时间"
                    name={[name, 'spendTime']}
                    rules={[{ required: true, message: '请选择驾驶时间' }]}
                  >
                    <Input placeholder="示例 00:18" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="总里程"
                    name={[name, 'allMileage']}
                    rules={[{ required: true, message: '请填写总里程数' }]}
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
          <Button type="primary" htmlType="submit">
            预览报销地图
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BusinessMap
