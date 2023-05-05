import { useState } from 'react'
import { IFormData, initialFormData } from '../types/types'
import dayjs, { Dayjs } from 'dayjs'
import { dateFormat, timeFormat } from '../constants/formats'

export const useFromData = () => {
  const [formData, setFormData] = useState<IFormData>(initialFormData)

  const handleSelectChange = (value: string | number, type: string) => {
    if (value) {
      setFormData((prevState) => ({ ...prevState, [type]: value }))
    } else {
      setFormData((prevState) => ({ ...prevState, [type]: '' }))
    }
  }
  const handleFormFinish = () => {
    console.log(formData)
  }

  const disabledDate = (current: Dayjs) => {
    return current < dayjs().startOf('day')
  }
  const disabledTime = (current: Dayjs, type: string) => {
    const disabledHours: number[] = []
    const disabledMinutes: number[] = []

    if (type === 'startTime') {
      // запрещаем выбор времени раньше текущего
      if (current.isSame(dayjs(), 'date')) {
        for (let i = 0; i < dayjs().hour(); i++) {
          disabledHours.push(i)
        }
        if (current.hour() === dayjs().hour()) {
          for (let i = 0; i < dayjs().minute(); i++) {
            disabledMinutes.push(i)
          }
        }
      }
      // запрещаем выбор времени позже endTime
      if (formData.endTime) {
        const endTime = dayjs(formData.endTime, timeFormat)
        if (current.isSame(endTime, 'date')) {
          for (let i = endTime.hour() + 1; i <= 23; i++) {
            disabledHours.push(i)
          }
          if (current.hour() === endTime.hour()) {
            for (let i = endTime.minute(); i < 60; i++) {
              disabledMinutes.push(i)
            }
          }
        }
      }
    } else {
      // запрещаем выбор времени раньше startTime
      if (formData.startTime) {
        const startTime = dayjs(formData.startTime, timeFormat)
        if (current.isSame(startTime, 'date')) {
          for (let i = 0; i < startTime.hour(); i++) {
            disabledHours.push(i)
          }
          if (current.hour() === startTime.hour()) {
            for (let i = 0; i < startTime.minute(); i++) {
              disabledMinutes.push(i)
            }
          }
        }
      }
    }

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes,
    }
  }

  const handleDateTimeChange = (value: Dayjs | null, type: string) => {
    let valueString = ''
    if (value) {
      switch (type) {
        case 'date':
          valueString = value.format(dateFormat)
          break
        case 'startTime':
          valueString = value.format(timeFormat)
          break
        case 'endTime':
          valueString = value.format(timeFormat)
          break
        default:
          valueString = ''
      }
      setFormData((prevState) => ({ ...prevState, [type]: valueString }))
    } else {
      setFormData((prevState) => ({ ...prevState, [type]: '' }))
    }
  }
  return { handleSelectChange, handleDateTimeChange, disabledDate, disabledTime, handleFormFinish }
}
