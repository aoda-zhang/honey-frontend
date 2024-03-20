import React, { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Form, message, Input, Spin } from "antd";

import {
  AVE_OIL,
  MAX_AVE_SPEED,
  MIN_AVE_SPEED,
  NO_DATA_MESSAGE,
  PageStatus,
} from "@/shared/constants";
import globalStore from "@/shared/store/globalStore";
import useOnPull from "@/shared/hooks/useOnPull";
import useDoubleClick from "@/shared/hooks/useDoubleClick";

import historyAPI from "../History/apis";

import BusinessMap from "./BuissnessMap";
import PreviewMap from "./PreviewMap";
import { FormValue } from "./types";
import styles from "./index.module.scss";
import fareStore from "./store";
import Info from "./Info";
import fareAPI, { HospitalType } from "./apis";
const Fare: FC = () => {
  const { setHospital } = globalStore();
  const { setForm, setDate, setCurrentDate, fareStatus, setFareStatus } =
    fareStore();
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const storeHospitals = useCallback(
    (data: HospitalType[]) => {
      const hospitalList = data?.map(item => ({
        label: item?.name,
        value: item?.name,
      }));
      if (hospitalList?.length > 0) {
        setHospital(hospitalList);
      }
    },
    [setHospital],
  );
  const fetchData = useCallback(() => {
    setLoading(true);
    fareAPI
      .getHospitalList()
      .then(data => {
        storeHospitals(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [storeHospitals]);
  const addHistory = async (value: FormValue) => {
    try {
      const fareHistory = value?.fareInfo?.map(item => ({
        ...item,
        from: item?.from?.[0],
        to: item?.to?.[0],
      }));
      await historyAPI.addFareHistory({
        spendDate: value?.spendDate,
        fareInfo: fareHistory,
      });
      message.success(`${value?.spendDate}报销已保存`);
    } catch (error) {
      message.warning(`${value?.spendDate}报销未成功保存`);
    }
  };
  useOnPull(fetchData);
  useDoubleClick(() => {
    setFareStatus({ isInfoOpen: true });
  });

  const updateHospitals = async (value: FormValue) => {
    const fullHospitals = value?.fareInfo
      ?.map(item => [item?.from?.[0], item?.to?.[0]])
      ?.flat(Infinity)
      ?.map(_item => ({ name: _item }));
    const AllHospitals = await fareAPI.updateHospital(fullHospitals);
    if (AllHospitals?.length > 0) {
      storeHospitals(AllHospitals);
      addHistory(value);
      message.success("医院信息已更新");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFinish = (value: FormValue) => {
    const formData = value?.fareInfo?.map(item => {
      const average = Math.floor(Math.random() * MAX_AVE_SPEED + MIN_AVE_SPEED);
      const MAX_SPEED = average + 30;
      return {
        startTime: `${value?.spendDate} ${item?.startTime}`,
        from: item.from,
        to: item.to,
        spendTime: item?.spendTime,
        average,
        maxSpend: Math.floor(
          Math.random() * (MAX_SPEED - average + 1) + average,
        ),
        allMileage: item?.allMileage,
        expectedOil: (item?.allMileage * AVE_OIL)?.toFixed(2),
      };
    });
    const fareInfo = formData?.sort(
      (c, b) => +dayjs(b.startTime)?.valueOf() - +dayjs(c.startTime)?.valueOf(),
    );
    if (fareInfo?.length > 0) {
      updateHospitals(value);
      setForm(fareInfo);
      setDate(value?.spendDate);
      setCurrentDate(value?.spendDate);
      setFareStatus({ isEdit: false, isView: true });
    } else {
      message.error(NO_DATA_MESSAGE);
    }
  };
  return (
    <div className={styles.fare}>
      <Spin size="large" spinning={isLoading} tip="医院获取中......">
        <Form name="basic" onFinish={onFinish} autoComplete="true" form={form}>
          {fareStatus?.isEdit && (
            <Form.Item
              label="本次报销月份"
              name="spendDate"
              rules={[{ required: true, message: "请填写本次报销的月份" }]}
              className={styles.spendDate}
            >
              <Input placeholder="示例 2023.08.23" />
            </Form.Item>
          )}

          {fareStatus?.isEdit && <BusinessMap />}
          {fareStatus?.isView && <PreviewMap />}
          <div className={styles.buttons}>
            {fareStatus?.isEdit && (
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  {PageStatus.View}
                </Button>
              </Form.Item>
            )}
            {fareStatus?.isView && (
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setFareStatus({ isEdit: true, isView: false });
                  }}
                >
                  {PageStatus.Edit}
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
        <Info
          isOpen={fareStatus.isInfoOpen}
          onClose={() => {
            setFareStatus({ isInfoOpen: false });
          }}
        ></Info>
      </Spin>
    </div>
  );
};
export default Fare;
