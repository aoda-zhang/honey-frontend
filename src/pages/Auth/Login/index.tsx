import React, { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import lover from "@/shared/assets/images/glove.png";
import storage from "@/shared/utils/storage";

import { AuthFieldType } from "../types";
import authAPI from "../apis";

import style from "./index.module.scss";
const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
            {t("login.primary_login")}
          </Button>
        </Form.Item>
      </Form>
      {/* <div className={style.help}>
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          {t("login.newUser")}
        </span>
        <span
          onClick={() => {
            navigate("/setting");
          }}
        >
          {t("common.setting")}
        </span>
      </div> */}
    </div>
  );
};
export default Login;
