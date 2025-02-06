'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import s from './style.module.css'
import { getDarkThemeClasses } from '@/app/theme'
type Props = {
  className?: string
  title: string
  description: string
  isChosen: boolean
  onChosen: () => void
  chosenConfig?: React.ReactNode
  icon?: JSX.Element
}

const RadioCard: FC<Props> = ({
  title,
  description,
  isChosen,
  onChosen,
  icon,
}) => {
  return (
    // <div
    //   className={cn(s.item, isChosen && s.active, 'flex')}
    //   onClick={onChosen}
    // >
      <div
      className={cn(s.item, isChosen && s.active, `flex ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('hover')} `)}
      onClick={onChosen}
    >
      {icon}
      <div>
        <div className='flex justify-between items-center'>
          {/* <div className='leading-5 text-sm font-medium text-gray-900'>{title}</div> */}
          <div className={`leading-5 text-sm font-medium text-gray-900 ${getDarkThemeClasses('text')}`}>{title}</div>
          <div className={s.radio}></div>
        </div>
        {/* <div className='leading-[18px] text-xs font-normal text-gray-500'>{description}</div> */}
        <div className={`leading-[18px] text-xs font-normal text-gray-500 ${getDarkThemeClasses('text')}`}>{description}</div>
      </div>
    </div>
  )
}
export default React.memo(RadioCard)
