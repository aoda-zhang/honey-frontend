import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'
import lover from '@/shared/assets/images/glove.png'
import style from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { AuthFieldType } from '../types'
const Login: FC = () => {
  const navigate = useNavigate()
  const onLogin = () => {
    console.log(99)
  }
  return (
    <div className={style.login}>
      <img src={lover} alt="" className={style.icon} />
      <Form className={style.form} name="login" onFinish={onLogin} autoComplete="off">
        <Form.Item<AuthFieldType>
          name="username"
          rules={[{ required: true, message: '请输入你的账户名' }]}
        >
          <Input placeholder="账户名" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="phoneNumber"
          rules={[{ required: true, message: '请输入你的手机号' }]}
        >
          <Input placeholder="手机号" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: '请输入你的密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.submitBtn}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={style.help}>
        <span
          onClick={() => {
            navigate('/register')
          }}
        >
          新用户注册
        </span>
        <span>帮助</span>
      </div>
    </div>
  )
}
export default Login
