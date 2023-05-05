import React from 'react'
import { DatePicker, TimePicker, Select, Input, Button, Form, Space } from 'antd'
import { useFromData } from './common/hooks/useFromData'
import { timeFormat } from './common/constants/formats'
import './App.css'

const { Option } = Select
const { TextArea } = Input

function App() {
  const { handleSelectChange, handleDateTimeChange, disabledDate, disabledTime, handleFormFinish } =
    useFromData()

  const floorOptions = [...Array(25)].map((_, index) => (
    <Option value={index + 3} key={index}>
      {index + 3}
    </Option>
  ))

  const roomOptions = [...Array(10)].map((_, index) => (
    <Option value={`Room ${index + 1}`} key={index}>
      Room {index + 1}
    </Option>
  ))
  return (
    <div className="container">
      <Form onFinish={handleFormFinish} name="basic" layout={'vertical'} className="form">
        <h3>Meeting room booking form</h3>
        <Space className="location">
          <Form.Item
            label="Tower"
            name="tower"
            rules={[{ required: true, message: 'Please select a tower!' }]}
          >
            <Select
              style={{ width: '145px' }}
              onChange={(value) => handleSelectChange(value, 'tower')}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Floor"
            name="floor"
            rules={[{ required: true, message: 'Please select a floor!' }]}
          >
            <Select
              style={{ width: '145px' }}
              onChange={(value) => handleSelectChange(value, 'floor')}
            >
              {floorOptions}
            </Select>
          </Form.Item>
          <Form.Item
            label="Room"
            name="room"
            rules={[{ required: true, message: 'Please select a room!' }]}
          >
            <Select
              style={{ width: '145px' }}
              onChange={(value) => handleSelectChange(value, 'room')}
            >
              {roomOptions}
            </Select>
          </Form.Item>
        </Space>
        <Space className="location">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              onChange={(value) => handleDateTimeChange(value, 'date')}
            />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: 'Please select a start time!' }]}
          >
            <TimePicker
              format={timeFormat}
              onChange={(value) => handleDateTimeChange(value, 'startTime')}
              disabledTime={(current) => disabledTime(current, 'startTime')}
            />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: 'Please select an end time!' }]}
          >
            <TimePicker
              format={timeFormat}
              onChange={(value) => handleDateTimeChange(value, 'endTime')}
              disabledTime={(current) => disabledTime(current, 'endTime')}
            />
          </Form.Item>
        </Space>
        <Form.Item label="Comment" name="comment">
          <TextArea
            onChange={(value) => handleSelectChange(value.currentTarget.value, 'comment')}
          />
        </Form.Item>
        <Space className="location">
          <Form.Item>
            <Button type="default" size="large" htmlType="reset" style={{ width: '100px' }}>
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" style={{ width: '100px' }}>
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}
export default App
