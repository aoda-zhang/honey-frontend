export interface AddressType {
  label: string
  value: string
}
export interface BMap {
  // 出发时间
  time: string
  // 出发地点
  from: string
  // 到达地点
  to: string
  // 总里程
  allMileage: number
  // 花费时间
  spendTime: number
  // 平均速度
  average?: number
  // 最大速度
  maxSpend?: number
  // 预估油费
  expectedOil: number
}
export type AddressOption = {
  label: string
  value: string
}
export type FormValue = { bMap: BMap[] }
