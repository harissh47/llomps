'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import cn from 'classnames'

type Option = {
  value: string
  label: string
}

type ItemProps = {
  title: string
  onClick: () => void
  isSelected: boolean
}
const Item: FC<ItemProps> = ({
  title,
  onClick,
  isSelected,
}) => {
  return (
    <div
      // className={cn(
      //   isSelected ? 'border-[2px] border-primary-400 bg-white  shadow-xs' : 'border border-gray-100 bg-gray-25 ',
      //   'w-0 grow flex items-center justify-center h-8 cursor-pointer rounded-lg text-[13px] font-normal text-gray-900')
      // }
      className={cn(
        isSelected ? 'border-[2px] border-primary-600 bg-white dark:bg-[#3e3e3e] shadow-xs' : 'border border-gray-100 dark:border-[#5f5f5f] bg-gray-25 dark:bg-[#2c2c2c]',
        'w-0 grow flex items-center justify-center h-8 cursor-pointer rounded-lg text-[13px] font-normal text-gray-900 dark:text-white')
      }
      onClick={onClick}
    >
      {title}
    </div>
  )
}

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

const RadioGroup: FC<Props> = ({
  options,
  value,
  onChange,
}) => {
  const handleChange = useCallback((value: string) => {
    return () => onChange(value)
  }, [onChange])
  return (
    <div className='flex space-x-2'>
      {options.map(option => (
        <Item
          key={option.value}
          title={option.label}
          onClick={handleChange(option.value)}
          isSelected={option.value === value}
        />
      ))}
    </div>
  )
}
export default React.memo(RadioGroup)
