import type { FC } from 'react'
import { useState } from 'react'
import { DotsHorizontal } from '@/app/components/base/icons/src/vender/line/general'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'

export type Item = {
  value: string | number
  text: string | JSX.Element
}
type DropdownProps = {
  items: Item[]
  secondItems?: Item[]
  onSelect: (item: Item) => void
  renderTrigger?: (open: boolean) => React.ReactNode
  popupClassName?: string
}
const Dropdown: FC<DropdownProps> = ({
  items,
  onSelect,
  secondItems,
  renderTrigger,
  popupClassName,
}) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (item: Item) => {
    setOpen(false)
    onSelect(item)
  }

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='bottom-end'
    >
      <PortalToFollowElemTrigger onClick={() => setOpen(v => !v)}>
        {
          renderTrigger
            ? renderTrigger(open)
            : (
              <div
                className={`
                  flex items-center justify-center w-6 h-6 cursor-pointer rounded-md
                  ${open && 'bg-black/5'}
                `}
              >
                <DotsHorizontal className='w-4 h-4 text-gray-500' />
              </div>
            )
        }
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className={popupClassName}>
        {/* <div className='rounded-lg border-[0.5px] border-gray-200 bg-white shadow-lg text-sm text-gray-700'> */}
        <div className='rounded-lg border-[0.5px] border-gray-200 dark:border-[#5F5F5F] bg-white shadow-lg text-sm text-gray-700 overflow-hidden'>
          {
            !!items.length && (
              // <div className='p-1'>
                <div className='p-1 dark:bg-[#3f3f3f]'>
                {
                  items.map(item => (
                    <div
                      key={item.value}
                      // className='flex items-center px-3 h-8 rounded-lg cursor-pointer hover:bg-gray-100'
                       className='flex items-center px-3 h-8 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer dark:text-white'
                      onClick={() => handleSelect(item)}
                    >
                      {item.text}
                    </div>
                  ))
                }
              </div>
            )
          }
          {
            (!!items.length && !!secondItems?.length) && (
              // <div className='h-[1px] bg-gray-100' />
              <div className='h-[1px] bg-gray-100 dark:bg-[#3F3F3F]' />
            )
          }
          {
            !!secondItems?.length && (
              <div className='p-1 dark:bg-[#3F3F3F]'>
                {
                  secondItems.map(item => (
                    <div
                      key={item.value}
                      // className='flex items-center px-3 h-8 rounded-lg cursor-pointer hover:bg-gray-100'
                       className='flex items-center px-3 h-8 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-600'
                      onClick={() => handleSelect(item)}
                    >
                      {item.text}
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default Dropdown
