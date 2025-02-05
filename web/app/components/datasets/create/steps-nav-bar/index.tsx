'use client'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

import cn from 'classnames'
import { useCallback } from 'react'
import s from './index.module.css'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'
=======

>>>>>>> origin/rupa
type IStepsNavBarProps = {
  step: number
  datasetId?: string
}

const STEP_T_MAP: Record<number, string> = {
  1: 'datasetCreation.steps.one',
  2: 'datasetCreation.steps.two',
  3: 'datasetCreation.steps.three',
}

const STEP_LIST = [1, 2, 3]

const StepsNavBar = ({
  step,
  datasetId,
}: IStepsNavBarProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile

  const navBackHandle = useCallback(() => {
    if (!datasetId)
      // router.replace('/datasets')
      router.replace('/data-mind')
    else
      // router.replace(`/datasets/${datasetId}/documents`)
      router.replace(`/data-mind/${datasetId}/documents`)
  }, [router, datasetId])

  return (
<<<<<<< HEAD
    <div className={`w-full pt-4 ${getDarkThemeClasses('background')}`}>
=======
    <div className='w-full pt-4 dark:bg-[#202020]'>
>>>>>>> origin/rupa
      {/* <div className={cn(s.stepsHeader, isMobile && '!px-0 justify-center')}> */}
      <div
        className={`flex items-center py-6 font-semibold text-[14px] leading-[20px] 
        ${isMobile ? 'justify-center px-0' : 'px-6'} 
<<<<<<< HEAD
        text-black dark:text-white`}>
        <div onClick={navBackHandle} className={cn(s.navBack, isMobile && '!mr-0')} /> 
        {!isMobile && (!datasetId ? t('datasetCreation.steps.header.creation') : t('datasetCreation.steps.header.update'))}
      </div>
      <div className={cn(s.stepList, isMobile && '!p-0')}>
        {STEP_LIST.map(item => (
          <div
            key={item}
            className={cn(s.stepItem, s[`step${item}`], step === item && s.active, step > item && s.done, isMobile && 'px-0')}
            >
            <div className={cn(s.stepNum)}>{item}</div>
=======
        text-[#6b7280] dark:text-white`}>
        <div onClick={navBackHandle} className={cn(s.navBack, isMobile && '!mr-0')} /> 
        {!isMobile && (!datasetId ? t('datasetCreation.steps.header.creation') : t('datasetCreation.steps.header.update'))}
      </div>
      <div className={cn(s.stepList," !bg-white dark:!bg-[#202020]", isMobile && '!p-0 !bg-white dark:!bg-[#202020] ')}>
        {STEP_LIST.map(item => (
          <div
            key={item}
            className={cn(s.stepItem,s[`step${item}`], step === item && s.active, step > item && s.done, isMobile && 'px-0')}
            >
            <div className={cn(s.stepNum,"!bg-white dark:!bg-[#202020]")}>{item}</div>
>>>>>>> origin/rupa
            
            <div className={cn(s.stepName,'text-primary-[#8AB40A]')}>{isMobile ? '' : t(STEP_T_MAP[item])} </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepsNavBar
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
