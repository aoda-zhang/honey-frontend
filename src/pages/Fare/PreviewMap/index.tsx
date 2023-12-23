import React, { FC } from "react";
import styles from "./index.module.scss";
import carIcon from "@/shared/assets/images/car.png";
import fareStore from "../store";
const PreviewMap: FC = () => {
  const { formData } = fareStore();
  const getSpendTime = (spendTime: number) => {
    let randomNumber = Math.floor(Math.random() * 59) + 1;
    if (randomNumber < 10) {
      randomNumber = Number(`0${randomNumber}`);
    }
    return `${spendTime}:${randomNumber}`;
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
              <span className={styles.follow}>一键跟走</span>
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
                <span>导航里程</span>
              </span>
              <span className={styles.column}>
                <span className={styles.value}>
                  {getSpendTime(item?.spendTime)}
                </span>
                <span>驾驶时长</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.average}</span>
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>平均速度</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.maxSpend}</span>
                  <span className={styles.unit}>km/h</span>
                </span>
                <span>最快速度</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.expectedOil}</span>
                  <span className={styles.unit}>元</span>
                </span>
                <span>预估油费</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewMap;
