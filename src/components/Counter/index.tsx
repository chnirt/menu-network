import { Button } from 'antd-mobile'
import classNames from 'classnames'
import { Minus, Plus } from 'lucide-react'
import { useCallback } from 'react'

const Counter = (
  // props: React.DetailedHTMLProps<
  //   React.InputHTMLAttributes<HTMLInputElement>,
  //   HTMLInputElement
  // >
  props: any
) => {
  const { onChangeValue, ...rest } = props
  const { value, min, max, disabled } = rest
  const isMin = Number(value) === Number(min)
  const isMax = Number(value) === Number(max)
  const decrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      const newCounter = Number(value) - 1
      onChangeValue(newCounter)
    },
    [value, onChangeValue]
  )
  const increment = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      const newCounter = Number(value) + 1
      onChangeValue(newCounter)
    },
    [value, onChangeValue]
  )
  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
    },
    []
  )
  return (
    <div className="relative flex">
      {!disabled ? (
        <Button
          className={classNames(
            'w-8 h-8 flex justify-center items-center rounded-[10px] leading-none',
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
      ) : null}
      <input
        className={classNames(
          'w-8 h-8 bg-transparent text-center text-primary text-xl font-bold',
          {
            invisible: isMin,
          }
        )}
        type="number"
        value={value}
        disabled
        {...rest}
      />
      {!disabled ? (
        <Button
          className="w-8 h-8 flex justify-center items-center rounded-[10px] leading-none"
          color="primary"
          size="mini"
          onMouseDown={onMouseDown}
          onClick={increment}
          disabled={isMax}
        >
          <Plus className="flex justify-between items-center w-4 h-4" />
        </Button>
      ) : null}
    </div>
  )
}

export default Counter
