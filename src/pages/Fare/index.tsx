import React, { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import BusinessMap from "./BuissnessMap";
import PreviewMap from "./PreviewMap";
import { Button, Form, message, Input, Spin } from "antd";
import {
  AVE_OIL,
  MAX_AVE_SPEED,
  MIN_AVE_SPEED,
  NO_DATA_MESSAGE,
  PageStatus,
} from "@/shared/constants";
import { FormValue } from "./types";
import styles from "./index.module.scss";
import fareStore from "./store";
import Info from "./Info";
import fareAPI, { HospitalType } from "./apis";
import historyAPI from "../History/apis";
import globalStore from "@/shared/store/globalStore";
import _ from "lodash";
import useOnPull from "@/shared/hooks/useOnPull";
import useDoubleClick from "@/shared/hooks/useDoubleClick";
const Fare: FC = () => {
  const { setHospital, hospitales } = globalStore();
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
  const addHistory = (value: FormValue) => {
    const fareHistory = value?.fareInfo?.map(item => ({
      ...item,
      from: item?.from?.[0],
      to: item?.to?.[0],
    }));

    historyAPI
      .addFareHistory({ spendDate: value?.spendDate, fareInfo: fareHistory })
      .then(() => {
        message.success(`${value?.spendDate}报销已保存`);
      });
  };
  useOnPull(fetchData);
  useDoubleClick(() => {
    setFareStatus({ isInfoOpen: true });
  });

  const updateHospital = async (value: FormValue) => {
    const hospitalInfo = value?.fareInfo
      ?.map(item => [item?.from?.[0], item?.to?.[0]])
      ?.flat(Infinity);
    const newHospitals = _.difference(
      hospitalInfo,
      hospitales?.map(item => item.value),
    )?.map(item => ({ name: item }));
    const hospitals = await fareAPI.updateHospital(newHospitals);
    if (hospitals?.length > 0) {
      storeHospitals(hospitals);
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
      updateHospital(value);
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
