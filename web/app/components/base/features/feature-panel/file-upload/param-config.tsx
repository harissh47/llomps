'use client'

import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import type { OnFeaturesChange } from '../../types'
import ParamConfigContent from './param-config-content'
import { Settings01 } from '@/app/components/base/icons/src/vender/line/general'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'
=======
>>>>>>> origin/rupa

type ParamsConfigProps = {
  onChange?: OnFeaturesChange
  disabled?: boolean
}
const ParamsConfig = ({
  onChange,
  disabled,
}: ParamsConfigProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='bottom-end'
      offset={{
        mainAxis: 4,
      }}
    >
      <PortalToFollowElemTrigger onClick={() => !disabled && setOpen(v => !v)}>
        {/* <div className={cn('flex items-center rounded-md h-7 px-3 space-x-1 text-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800', open && 'bg-gray-200', disabled && 'cursor-not-allowed opacity-50')}> */}
        <div className={cn('flex items-center rounded-md h-7 px-3 space-x-1 text-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800', open && 'bg-gray-200 dark:bg-zinc-800', disabled && 'cursor-not-allowed opacity-50')}>

          <Settings01 className='w-3.5 h-3.5 ' />
          {/* <div className='ml-1 leading-[18px] text-xs font-medium '>{t('appDebug.voice.settings')}</div> */}
          <div className='ml-1 leading-[18px] text-xs font-medium dark:text-white'>{t('appDebug.voice.settings')}</div>

        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent style={{ zIndex: 50 }}>
<<<<<<< HEAD
        {/* <div className='w-80 sm:w-[412px] p-4 bg-white ${getDarkThemeClasses('background')} rounded-lg border-[0.5px] border-gray-200 shadow-lg space-y-3'> */}
         
        {/* <div className='w-80 sm:w-[412px] p-4 bg-white ${getDarkThemeClasses('background')} rounded-lg border-[0.5px] border-gray-200 shadow-lg space-y-3'> */}
        <div className={`w-80 sm:w-[412px] p-4 ${getDarkThemeClasses('background')} rounded-lg border-[0.5px] border-gray-200 dark:border-[#5F5F5F] shadow-lg space-y-3`}>
=======
        {/* <div className='w-80 sm:w-[412px] p-4 bg-white dark:bg-[#202020] rounded-lg border-[0.5px] border-gray-200 shadow-lg space-y-3'> */}
         
        {/* <div className='w-80 sm:w-[412px] p-4 bg-white dark:bg-[#202020] rounded-lg border-[0.5px] border-gray-200 shadow-lg space-y-3'> */}
        <div className='w-80 sm:w-[412px] p-4 bg-white dark:bg-[#202020] rounded-lg border-[0.5px] border-gray-200 dark:border-[#5F5F5F] shadow-lg space-y-3'>
>>>>>>> origin/rupa
        <ParamConfigContent onChange={onChange} />
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}
export default memo(ParamsConfig)
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
