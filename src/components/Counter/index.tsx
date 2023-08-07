import { Button } from 'antd-mobile'
import classNames from 'classnames'
import { Minus, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'

const Counter = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const { min, max } = props
  const [counter, setCounter] = useState<string | number>(0)
  const isMin = Number(counter) === Number(min)
  const isMax = Number(counter) === Number(max)
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(event.target.value)
  }, [])
  const decrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      setCounter((prevState) => Number(prevState) - 1)
    },
    [min]
  )
  const increment = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      setCounter((prevState) => Number(prevState) + 1)
    },
    []
  )
  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
    },
    []
  )
  return (
    <div className="relative flex">
      <Button
        className={classNames(
          'w-8 h-8 flex justify-center items-center rounded-[10px]',
          {
            hidden: isMin,
          }
        )}
        color="primary"
        size="mini"
        onMouseDown={onMouseDown}
        onClick={decrement}
        disabled={isMin}
      >
        <Minus className="flex justify-between items-center w-4 h-4" />
      </Button>
      <input
        className={classNames(
          'w-12 h-8 bg-transparent text-center text-primary text-xl font-bold',
          {
            invisible: isMin,
          }
        )}
        type="number"
        value={counter}
        onChange={onChange}
        disabled
        {...props}
      />
      <Button
        className="w-8 h-8 flex justify-center items-center rounded-[10px]"
        color="primary"
        size="mini"
        onMouseDown={onMouseDown}
        onClick={increment}
        disabled={isMax}
      >
        <Plus className="flex justify-between items-center w-4 h-4" />
      </Button>
    </div>
  )
}

export default Counter
