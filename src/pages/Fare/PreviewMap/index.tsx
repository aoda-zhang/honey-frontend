import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import carIcon from "@/shared/assets/images/car.png";

import fareStore from "../store";

import styles from "./index.module.scss";
const PreviewMap: FC = () => {
  const { formData } = fareStore();
  const { t } = useTranslation();
  const getSpendTime = (spendTime: number) => {
    const randomNumber = Math.floor(Math.random() * 60);
    const formattedNumber = randomNumber.toString().padStart(2, "0");
    return `${spendTime}:${formattedNumber}`;
  };
  const getAllMileage = (allMileage: number) => {
    const randomNumber = Math.floor(Math.random() * 10);
    return `${allMileage}.${randomNumber}`;
  };
  return (
    <div className={styles.previewMap}>
      <div className={styles.content} id="ZYR">
        {formData?.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.time}>
              <span className={styles.left}>
                <span>
                  <img className={styles.carIcon} src={carIcon}></img>
                </span>
                <span className={styles.text}>{item?.startTime}</span>
              </span>
              <span className={styles.follow}>{t("fee.with")}</span>
            </div>
            <div className={styles.hospital}>
              <span className={styles.icon}>
                <span className={styles.redC}></span>
                <span className={styles.borderC}></span>
                <span className={styles.greenC}></span>
              </span>
              <span className={styles.name}>
                <span>{item?.from}</span>
                <span>{item?.to}</span>
              </span>
            </div>
            <div className={styles.spendTime}>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>
                    {getAllMileage(item?.allMileage)}
                  </span>
                  <span className={styles.unit}>km</span>
                </span>
                <span>{t("fee.allMileage")}</span>
              </span>
              <span className={styles.column}>
                <span className={styles.value}>
                  {getSpendTime(item?.spendTime)}
                </span>
                <span>{t("fee.spendTime")}</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.average}</span>
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>{t("fee.average")}</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.maxSpend}</span>
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>{t("fee.maxSpend")}</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.expectedOil}</span>
                  <span className={styles.unit}>元</span>
                </span>
                <span>{t("fee.expectedOil")}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(PreviewMap);
