import React from 'react'
import { Button, DatePicker, Form, Input, Space, message } from 'antd'
import moment from 'moment'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { NO_DATA_MESSAGE } from 'src/constants'
// import { HospatialType } from '../Hospital'
// import { storage } from 'src/utils/storage'
export interface BMap {
  time: string
  from: string
  to: string
  allMileage: number
  spendTime: number
  average?: number
  maxSpend?: number
}
type FormValue = { bMap: BMap[] }

const BusinessMap: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // const [hospatial, setHospatial] = useState<any[]>([])
  // useEffect(() => {
  //   const hos: HospatialType[] = storage.get('animalHospatial') ?? []
  //   const options = hos.map(item => ({ label: item.name, value: item.name }))
  //   setHospatial(() => [...options])
  // }, [])
  const onFinish = (value: FormValue) => {
    const BMapList = value?.bMap?.map(item => {
      const average = Math.round(+item?.allMileage / (+item?.spendTime / 60))
      const MAX_SPEED = average + 30
      return {
        time: moment(item.time).format('YYYY.MM.DD HH:mm'),
        from: item.from,
        to: item.to,
        spendTime: item.spendTime,
        average,
        maxSpend: Math.floor(Math.random() * (MAX_SPEED - average + 1) + average),
        allMileage: item?.allMileage
      }
    })
    console.log(BMapList)

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
                    {/* <Select
                      allowClear
                      size="large"
                      showSearch
                      placeholder="请选择到达医院"
                      optionFilterProp="children"
                      options={hospatial}
                    /> */}
                    <Input placeholder="请填写到达医院" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="驾驶时间"
                    name={[name, 'spendTime']}
                    rules={[{ required: true, message: '请输入驾驶分钟数' }]}
                  >
                    <Input type="number" placeholder="请填写驾驶分钟数" />
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
