const translateTime = (time: number | string): string => {
  let result
  if (+time > 60 || +time === 60) {
    const minute = +time / 60
    if (minute > 9) {
      result = `${Math.round(+time / 60)}:00`
    } else {
      result = `0${Math.round(+time / 60)}:00`
    }
  } else {
    result = `00:${+time}`
  }
  return result
}
export default translateTime
