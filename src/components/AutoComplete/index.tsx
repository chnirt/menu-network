import { useCallback, useMemo, useRef, useState } from 'react'
import {
  Button,
  CheckList,
  Dialog,
  Popup,
  SearchBar,
  SwipeAction,
} from 'antd-mobile'
import { DeleteOutline, EditSOutline } from 'antd-mobile-icons'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'

const AutoComplete = ({
  items,
  buttonText,
  selected,
  onSelect,
  searchPlaceholder,
  onUpdate,
  onDelete,
}: any) => {
  const swipeActionRef = useRef<SwipeActionRef>(null)
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const filteredItems = useMemo(() => {
    if (searchText) {
      return items.filter((item: any) => item.includes(searchText))
    } else {
      return items
    }
  }, [items, searchText])

  const isSelected = filteredItems?.some((item: any) => item.id === selected.id)

  const handleOnAction = useCallback(async (action: Action, dataItem: any) => {
    console.log(dataItem)
    switch (action.key) {
      case 'update':
        {
          typeof onUpdate === 'function' ? onUpdate(dataItem) : undefined
          swipeActionRef.current?.close()
        }
        return
      case 'delete':
        {
          await Dialog.confirm({
            content: 'Are you sure want to delete?',
            cancelText: 'Cancel',
            confirmText: 'Delete',
            onConfirm: () => {
              typeof onDelete === 'function' ? onDelete(dataItem) : undefined
            },
          })
          swipeActionRef.current?.close()
        }
        return
      default:
        return
    }
  }, [])

  const rightActions: Action[] = [
    {
      key: 'update',
      text: <EditSOutline />,
      color: 'warning',
    },
    {
      key: 'delete',
      text: <DeleteOutline />,
      color: 'danger',
    },
  ]

  return (
    <div>
      <Button
        type="submit"
        size="middle"
        shape="rounded"
        color={isSelected ? 'primary' : 'default'}
        fill={isSelected ? 'outline' : 'none'}
        onClick={() => {
          setVisible(true)
        }}
      >
        {buttonText
          ? isSelected
            ? `${buttonText} - ${selected?.objectName}`
            : buttonText
          : 'Select'}
      </Button>

      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        destroyOnClose
      >
        <div className="p-3">
          <SearchBar
            placeholder={searchPlaceholder ? searchPlaceholder : 'Search'}
            value={searchText}
            onChange={(v) => {
              setSearchText(v)
            }}
          />
        </div>
        <div className="h-72 overflow-y-auto">
          <CheckList
            defaultValue={selected ? [selected] : []}
            onChange={(val) => {
              // setSelected(val[0])
              onSelect(val[0])
              setVisible(false)
            }}
          >
            {filteredItems.map((item: any, ii: number) => (
              <SwipeAction
                key={`item-${ii}`}
                style={{
                  '--background': 'transparent',
                }}
                ref={swipeActionRef}
                rightActions={rightActions}
                onAction={(action) => handleOnAction(action, item)}
              >
                <CheckList.Item key={item} value={item}>
                  {item?.objectName}
                </CheckList.Item>
              </SwipeAction>
            ))}
          </CheckList>
        </div>
      </Popup>
    </div>
  )
}

export default AutoComplete
