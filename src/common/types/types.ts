export interface IFormData {
  tower: string
  floor: number
  room: string
  date: string
  startTime: string
  endTime: string
  comment: string
}
export const initialFormData: IFormData = {
  tower: '',
  floor: 3,
  room: '',
  date: '',
  startTime: '',
  endTime: '',
  comment: '',
}
