'use client'
import type { FC } from 'react'
import React from 'react'
import { getDarkThemeClasses } from '@/app/theme'
type Props = {
  children: React.ReactNode
}

const ListNoDataPlaceholder: FC<Props> = ({
  children,
}) => {
  return (
    // <div className='flex rounded-md bg-gray-50 items-center min-h-[42px] justify-center leading-[18px] text-xs font-normal text-gray-500'>
    <div className={`flex rounded-md bg-gray-50 ${getDarkThemeClasses('background2')} items-center min-h-[42px] justify-center leading-[18px] text-xs font-normal text-gray-500 ${getDarkThemeClasses('text')}`}>

      {children}
    </div>
  )
}
export default React.memo(ListNoDataPlaceholder)
