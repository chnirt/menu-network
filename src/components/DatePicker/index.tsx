import { Calendar } from 'antd-mobile'

const DatePicker = ({ value, onChange }: any) => {
  return (
    <div>
      <Calendar
        className="calendar-custom"
        selectionMode="range"
        value={value}
        onChange={onChange}
        max={new Date()}
      />
    </div>
  )
}

export default DatePicker
