'use client'
import type { FC } from 'react'
import React from 'react'
import { getDarkThemeClasses } from '@/app/theme'
type Props = {
  title: string
  content: string | JSX.Element
}

const InfoPanel: FC<Props> = ({
  title,
  content,
}) => {
  return (
    <div>
      {/* <div className='px-[5px] py-[3px] bg-gray-100 rounded-md '> */}
      <div className={`px-[5px] py-[3px] bg-gray-100 ${getDarkThemeClasses('background3')} rounded-md `}>

        <div className={`leading-4 text-[10px] font-medium text-gray-500 ${getDarkThemeClasses('sub_text1')} uppercase`}>
          {title}
        </div>
        {/* <div className='leading-4 text-xs font-normal text-gray-700 break-words'> */}
        <div className={`leading-4 text-xs font-normal text-gray-700 ${getDarkThemeClasses('sub_text1')} break-words`}>
          {content}
        </div>
      </div>
    </div>
  )
}
export default React.memo(InfoPanel)
