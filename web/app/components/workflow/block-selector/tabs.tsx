import type { FC } from 'react'
import {
  memo,
  useState,
} from 'react'
import cn from 'classnames'
import type { BlockEnum } from '../types'
import { useTabs } from './hooks'
import type { ToolDefaultValue } from './types'
import { TabsEnum } from './types'
import Blocks from './blocks'
import AllTools from './all-tools'

export type TabsProps = {
  searchText: string
  onSelect: (type: BlockEnum, tool?: ToolDefaultValue) => void
  availableBlocksTypes?: BlockEnum[]
  noBlocks?: boolean
}
const Tabs: FC<TabsProps> = ({
  searchText,
  onSelect,
  availableBlocksTypes,
  noBlocks,
}) => {
  const tabs = useTabs()
  const [activeTab, setActiveTab] = useState(noBlocks ? TabsEnum.Tools : TabsEnum.Blocks)

  return (
    <div onClick={e => e.stopPropagation()}>
      {
        !noBlocks && (
          // <div className='flex items-center px-3 border-b-[0.5px] border-b-black/5'>
          <div className='flex items-center px-3 border-b-[0.5px] border-b-black/5 dark:border-b-[#5F5F5F]'>
            {
              tabs.map(tab => (
                <div
                  key={tab.key}
                  className={cn(
                    'relative mr-4 h-[34px] leading-[34px] text-[13px] font-medium cursor-pointer',
                    activeTab === tab.key
                      ? 'text-gray-700 dark:text-[#A1A6B2] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-600'
                      : 'text-gray-500 dark:text-[#6B7082]',
                  )}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.name}
                </div>
              ))
            }
          </div>
        )
      }
      {
        activeTab === TabsEnum.Blocks && !noBlocks && (
          <Blocks
            searchText={searchText}
            onSelect={onSelect}
            availableBlocksTypes={availableBlocksTypes}
          />
        )
      }
      {
        activeTab === TabsEnum.Tools && (
          <AllTools
            searchText={searchText}
            onSelect={onSelect}
          />
        )
      }
    </div>
  )
}

export default memo(Tabs)
