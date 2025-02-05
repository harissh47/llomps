'use client'

import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from '@/app/components/base/icons/src/vender/line/general'
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'
=======
>>>>>>> origin/rupa

const CreateAppCard = forwardRef<HTMLAnchorElement>((_, ref) => {
  const { t } = useTranslation()

  return (
    // <a ref={ref} className='group flex flex-col col-span-1 bg-gray-200 border-[0.5px] border-black/5 rounded-xl min-h-[160px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-white hover:shadow-lg' href='/datasets/create'>
    // <a ref={ref} className='group flex flex-col col-span-1 bg-gray-200 border-[0.5px] border-black/5 rounded-xl min-h-[160px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-white hover:shadow-lg' href='/data-mind/create'>
      <a ref={ref} className='group flex flex-col col-span-1 bg-gray-200 border-[0.5px] border-black/5 rounded-xl min-h-[160px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-white hover:shadow-lg dark:bg-[#1A1A1A] dark:border-2 dark:border-[#3F3F3F] dark:border-solid dark:rounded-xl dark:shadow-sm' href='/data-mind/create'>
      <div className='shrink-0 flex items-center p-4 pb-3'>
        {/* <div className='w-10 h-10 flex items-center justify-center border border-gray-200 bg-gray-100 rounded-lg'> */}
<<<<<<< HEAD
        <div className={`w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-[#5f5f5f] dark:hover:border-primary-600 bg-gray-100  rounded-lg ${getDarkThemeClasses('background')}`}>
=======
        <div className='w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-[#5f5f5f] dark:hover:border-primary-600 bg-gray-100 dark:bg-[#202020] rounded-lg'>
>>>>>>> origin/rupa
          <Plus className='w-4 h-4 text-gray-500 dark:hover:text-primary-600' />
        </div>
        {/* <div className='ml-3 text-sm font-semibold leading-5 text-gray-800 group-hover:text-primary-600'>{t('dataset.createDataset')}</div> */}
        <div className='ml-3 text-sm font-semibold leading-5 text-gray-800 group-hover:text-primary-600 dark:text-white'>{t('dataset.createDataset')}</div>
      </div>
      {/* <div className='mb-1 px-4 text-xs leading-normal text-gray-500 line-clamp-4'>{t('dataset.createDatasetIntro')} */}
    <div className='mb-1 px-4 text-xs leading-normal text-gray-500 line-clamp-4 dark:text-white'>{t('dataset.createDatasetIntro')}
      </div>
    </a>
  )
})

CreateAppCard.displayName = 'CreateAppCard'

export default CreateAppCard
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
