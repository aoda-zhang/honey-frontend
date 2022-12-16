import React, { useEffect } from 'react'
import { Button, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
export type HospatialType = { name: string }

const Hospital: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async (values: { animalHospatial: HospatialType[] }) => {
    await localStorage.setItem('animalHospatial', JSON.stringify(values.animalHospatial))
    navigate('/businessMap')
  }
  useEffect(() => {
    const hos: HospatialType[] = JSON.parse(localStorage.getItem('animalHospatial'))
    if (hos) {
      form.setFieldValue('animalHospatial', hos)
    }
  }, [form])
  return (
    <div className={styles.hospatial}>
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.List name="animalHospatial">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 4 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: '请填写宠物医院' }]}
                  >
                    <Input placeholder="请输入具体宠物医院" className={styles.input} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加宠物医院
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            填写报销行程
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Hospital
