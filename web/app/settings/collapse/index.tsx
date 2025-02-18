import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

export type IItem = {
  key: string
  name: string
}
type ICollapse = {
  title: string | undefined
  items: IItem[]
  renderItem: (item: IItem) => React.ReactNode
  onSelect?: (item: IItem) => void
  wrapperClassName?: string
}
const Collapse = ({
  title,
  items,
  renderItem,
  onSelect,
  wrapperClassName,
}: ICollapse) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return (
    // <div className={classNames('border border-gray-200 bg-gray-50 rounded-lg', wrapperClassName)}>
      <div className={classNames('border border-gray-200 dark:border-[#5f5f5f]  bg-gray-50 dark:bg-[#3f3f3f] rounded-lg', wrapperClassName)}>
      {/* <div className='flex items-center justify-between leading-[18px] px-3 py-2 text-xs font-medium text-gray-800 cursor-pointer' onClick={toggle}> */}
      <div className='flex items-center justify-between leading-[18px] px-3 py-2 text-xs font-medium text-gray-800 dark:text-white cursor-pointer' onClick={toggle}>

        {title}
        {
          open
            ? <ChevronDownIcon className='w-3 h-3 text-gray-400' />
            : <ChevronRightIcon className='w-3 h-3 text-gray-400' />
        }
      </div>
      {
        open && (
          // <div className='py-2 border-t border-t-gray-100'>
          <div className='py-2 border-t border-t-gray-100 dark:border-t-[#5f5f5f]'>

            {
              items.map(item => (
                <div key={item.key} onClick={() => onSelect && onSelect(item)}>
                  {renderItem(item)}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Collapse
