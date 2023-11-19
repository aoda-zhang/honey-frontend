import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'
import register from '@/shared/assets/images/register.png'
import style from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { AuthFieldType } from '../types'
import authAPI from '../apis'

const Register: FC = () => {
  const navigate = useNavigate()
  const onRegister = async (value: AuthFieldType) => {
    const isRegrester = await authAPI.register(value)
    console.log('是否注册成功', isRegrester)
  }
  return (
    <div className={style.register}>
      <img src={register} alt="" className={style.icon} />
      <Form className={style.form} name="login" onFinish={onRegister} autoComplete="off">
        <Form.Item<AuthFieldType>
          name="username"
          rules={[{ required: true, message: '请输入注册账户名' }]}
        >
          <Input placeholder="账户名" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="phoneNumber"
          rules={[{ required: true, message: '请输入注册手机号' }]}
        >
          <Input placeholder="手机号" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: '请输入注册密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.submitBtn}>
            注册并自动登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
