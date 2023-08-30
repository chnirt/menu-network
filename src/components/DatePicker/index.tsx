import { Calendar } from 'antd-mobile'

const DatePicker = ({ value, onChange }: any) => {
  return (
    <div>
      <Calendar
        className="calendar-custom"
        selectionMode="range"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default DatePicker
