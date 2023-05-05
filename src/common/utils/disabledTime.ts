import dayjs, { Dayjs } from 'dayjs'

const format = 'HH:mm'

const getDisabledHours = (current: Dayjs, endOrStartTime: Dayjs, isStart: boolean) => {
  const disabledHours: number[] = []
  if (current.isSame(endOrStartTime, 'date')) {
    for (
      let i = isStart ? 0 : endOrStartTime.hour() + 1;
      i < (isStart ? dayjs().hour() : 24);
      i++
    ) {
      disabledHours.push(i)
    }
  }
  return disabledHours
}

const getDisabledMinutes = (current: Dayjs, endOrStartTime: Dayjs, isStart: boolean) => {
  const disabledMinutes: number[] = []
  if (current.isSame(endOrStartTime, 'date') && current.hour() === endOrStartTime.hour()) {
    for (let i = endOrStartTime.minute(); i < (isStart ? dayjs().minute() : 60); i++) {
      disabledMinutes.push(i)
    }
  }
  return disabledMinutes
}

export const disabledTime = (
  current: Dayjs,
  type: string,
  stateEndTime: string,
  stateStartTime: string
) => {
  const disabledHours: number[] = []
  const disabledMinutes: number[] = []

  if (type === 'startTime') {
    // запрещаем выбор времени раньше текущего
    if (current.isSame(dayjs(), 'date')) {
      for (let i = 0; i < dayjs().hour(); i++) {
        disabledHours.push(i)
      }
      disabledMinutes.push(...getDisabledMinutes(current, dayjs(), true))
    }
    // запрещаем выбор времени позже endTime
    if (stateEndTime) {
      const endTime = dayjs(stateEndTime, format)
      disabledHours.push(...getDisabledHours(current, endTime, true))
      disabledMinutes.push(...getDisabledMinutes(current, endTime, true))
    }
  } else {
    // запрещаем выбор времени раньше startTime
    if (stateStartTime) {
      const startTime = dayjs(stateStartTime, format)
      disabledHours.push(...getDisabledHours(current, startTime, false))
      disabledMinutes.push(...getDisabledMinutes(current, startTime, false))
    }
  }

  return {
    disabledHours: () => disabledHours,
    disabledMinutes: () => disabledMinutes,
  }
}
