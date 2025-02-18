'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

type Props = {
  isChecked: boolean
}

const RadioUI: FC<Props> = ({
  isChecked,
}) => {
  return (
    // <div className={cn(isChecked ? 'border-[5px] border-[#155eef]' : 'border-[2px] border-gray-200', 'w-4 h-4  rounded-full')}>
    // </div>

<div className={cn(isChecked ? 'border-[5px] border-[#8AB40A]' : 'border-[2px] border-gray-200 dark:border-[#5f5f5f]', 'w-4 h-4  rounded-full')}>
    </div>
  )
}
export default React.memo(RadioUI)
