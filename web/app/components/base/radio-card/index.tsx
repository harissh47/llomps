'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import s from './style.module.css'

type Props = {
  className?: string
  icon: React.ReactNode
  iconBgClassName?: string
  title: React.ReactNode
  description: string
  noRadio?: boolean
  isChosen?: boolean
  onChosen?: () => void
  chosenConfig?: React.ReactNode
  chosenConfigWrapClassName?: string
}

const RadioCard: FC<Props> = ({
  icon,
  iconBgClassName = 'bg-[#F5F3FF]',
  title,
  description,
  noRadio,
  isChosen,
  onChosen = () => {},
  chosenConfig,
  chosenConfigWrapClassName,
}) => {
  return (
<<<<<<< HEAD
    <div className={cn(s.item, isChosen && s.active)}>
      
      <div className='flex py-3 pl-3 pr-4' onClick={onChosen}>
        <div className={cn(iconBgClassName, 'mr-3 shrink-0 flex w-8 justify-center h-8 items-center rounded-lg dark:bg-[#a1a6b2]')}>
=======
    // <div className={cn(s.item, isChosen && s.active)}>
    <div
  className={`relative rounded-xl border border-gray-100 dark:border-[#5f5f5f] cursor-pointer ${
    isChosen
      ? 'border-[1.5px] border-[#4CAF50] shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]'
      : 'border-gray-100 bg-[#fcfcfd]'
  }`}
>
      
      <div className='flex py-3 pl-3 pr-4 dark:bg-[#3f3f3f] rounded-t-xl' onClick={onChosen}>
        <div className={cn(iconBgClassName, 'mr-3 shrink-0 flex w-8 justify-center h-8 items-center rounded-lg dark:bg-[#5f5f5f]')}>
>>>>>>> origin/rupa
          {icon}
        </div>
        <div className='grow'>
          {/* <div className='leading-5 text-sm font-medium text-gray-900'>{title}</div>
          <div className='leading-[18px] text-xs font-normal text-[#667085]'>{description}</div> */}
          <div className='leading-5 text-sm font-medium text-gray-900 dark:text-white'>{title}</div>
          <div className='leading-[18px] text-xs font-normal text-[#667085] dark:text-[#FCFCFC]'>{description}</div>
        </div>
        {!noRadio && (
          <div className='shrink-0 flex items-center h-8'>
            <div className={s.radio}></div>
          </div>
        )}
      </div>
      {((isChosen && chosenConfig) || noRadio) && (
        // <div className={cn(chosenConfigWrapClassName, 'pt-2 px-14 pb-6 border-t border-gray-200')}>
<<<<<<< HEAD
        <div className={cn(chosenConfigWrapClassName, 'pt-2 px-14 pb-6 border-t border-gray-200 dark:border-t-[#5F5F5F]')}>
=======
        <div className={cn(chosenConfigWrapClassName, 'pt-2 px-14 pb-6 rounded-b-xl border-t border-gray-200 dark:!border-t-[#5F5F5F] dark:bg-[#3f3f3f]')}>
>>>>>>> origin/rupa
          {chosenConfig}
        </div>
      )}
    </div>
  )
}
export default React.memo(RadioCard)
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
