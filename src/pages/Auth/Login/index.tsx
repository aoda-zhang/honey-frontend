import React, { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import lover from "@/shared/assets/images/glove.png";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthFieldType } from "../types";
import storage from "@/shared/utils/storage";
import authAPI from "../apis";
const Login: FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onLogin = async (value: Omit<AuthFieldType, "phoneNumber">) => {
    setIsLogin(true);
    authAPI
      .login({
        userName: value?.userName,
        password: value?.password,
      })
      .then(loginInfo => {
        if (loginInfo?.accessToken && loginInfo?.refreshToken) {
          storage.set("access-token", loginInfo?.accessToken);
          storage.set("refreshToken", loginInfo?.refreshToken);
          navigate("/fare");
        }
      })
      .finally(() => {
        setIsLogin(false);
      });
  };
  return (
    <div className={style.login}>
      <img src={lover} alt="" className={style.icon} />
      <Form
        className={style.form}
        name="login"
        onFinish={onLogin}
        autoComplete="on"
      >
        <Form.Item<AuthFieldType>
          name="userName"
          rules={[{ required: true, message: "请输入你的账户名" }]}
        >
          <Input placeholder="账户名" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: "请输入你的密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLogin}
            type="primary"
            htmlType="submit"
            className={style.submitBtn}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={style.help}>
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          新用户注册
        </span>
        <span>帮助</span>
      </div>
    </div>
  );
};
export default Login;
