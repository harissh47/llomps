import { memo } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { useFontSize } from './hooks'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import { TitleCase } from '@/app/components/base/icons/src/vender/line/editor'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { Check } from '@/app/components/base/icons/src/vender/line/general'

const FontSizeSelector = () => {
  const { t } = useTranslation()
  const FONT_SIZE_LIST = [
    {
      key: '12px',
      value: t('workflow.nodes.note.editor.small'),
    },
    {
      key: '14px',
      value: t('workflow.nodes.note.editor.medium'),
    },
    {
      key: '16px',
      value: t('workflow.nodes.note.editor.large'),
    },
  ]
  const {
    fontSizeSelectorShow,
    handleOpenFontSizeSelector,
    fontSize,
    handleFontSize,
  } = useFontSize()

  return (
    <PortalToFollowElem
      open={fontSizeSelectorShow}
      onOpenChange={handleOpenFontSizeSelector}
      placement='bottom-start'
      offset={2}
    >
      <PortalToFollowElemTrigger onClick={() => handleOpenFontSizeSelector(!fontSizeSelectorShow)}>
        <div className={cn(
          // 'flex items-center pl-2 pr-1.5 h-8 rounded-md text-[13px] font-medium text-gray-700 cursor-pointer hover:bg-gray-50',
          'flex items-center pl-2 pr-1.5 h-8 rounded-md text-[13px] font-medium text-gray-700 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800',

          fontSizeSelectorShow && 'bg-gray-50 dark:bg-[#383838]',
        )}>
          <TitleCase className='mr-1 w-4 h-4' />
          {FONT_SIZE_LIST.find(font => font.key === fontSize)?.value || t('workflow.nodes.note.editor.small')}
          <ChevronDown className='ml-0.5 w-3 h-3' />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent>
        <div className='p-1 w-[120px] bg-white dark:bg-[#3f3f3f] border-[0.5px] border-gray-200 dark:border-[#5f5f5f] rounded-md shadow-xl text-gray-700 dark:text-white'>
          {
            FONT_SIZE_LIST.map(font => (
              <div
                key={font.key}
                className='flex items-center justify-between pl-3 pr-2 h-8 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800'
                onClick={(e) => {
                  e.stopPropagation()
                  handleFontSize(font.key)
                  handleOpenFontSizeSelector(false)
                }}
              >
                <div
                  style={{ fontSize: font.key }}
                >
                  {font.value}
                </div>
                {
                  fontSize === font.key && (
                    <Check className='w-4 h-4 text-primary-500' />
                  )
                }
              </div>
            ))
          }
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default memo(FontSizeSelector)
