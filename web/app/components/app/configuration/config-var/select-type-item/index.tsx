'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import s from './style.module.css'
import type { InputVarType } from '@/app/components/workflow/types'
import InputVarTypeIcon from '@/app/components/workflow/nodes/_base/components/input-var-type-icon'
import { getDarkThemeClasses } from '@/app/theme'
export type ISelectTypeItemProps = {
  type: InputVarType
  selected: boolean
  onClick: () => void
}

const SelectTypeItem: FC<ISelectTypeItemProps> = ({
  type,
  selected,
  onClick,
}) => {
  const { t } = useTranslation()
  const typeName = t(`appDebug.variableConig.${type}`)

  return (
    <div
      // className={cn(s.item, selected && s.selected, 'space-y-1')}
      className={cn(`flex flex-col justify-center items-center h-[58px] w-[98px] rounded-lg border border-[#EAECF0] ${getDarkThemeClasses('border')} shadow-sm bg-white ${getDarkThemeClasses('shadow')} cursor-pointer`, selected ? `border-[#4CAF50] bg-[#F5F8FF] text-[#8AB40A] shadow-md` : `hover:border-[#B2CCFF] ${getDarkThemeClasses('borderhover3')} hover:bg-[#F5F8FF] ${getDarkThemeClasses('hover')} ${getDarkThemeClasses('svg')} hover:shadow-lg`, `space-y-1 ${getDarkThemeClasses('background3')}`)}

      onClick={onClick}
    >
      <div className='shrink-0'>
        <InputVarTypeIcon type={type} className='w-5 h-5' />
      </div>
      {/* <span className={cn(s.text)}>{typeName}</span> */}
      <span className={cn(`text-sm text-[#667085] ${getDarkThemeClasses('sub_text1')} font-medium`)}>{typeName}</span>
    </div>
  )
}
export default React.memo(SelectTypeItem)
