import React from 'react'
import { getLocaleOnServer, useTranslation as translate } from '@/i18n/server'
import Form from '@/app/components/datasets/settings/form'
import s from './style.module.css'
import cn from 'classnames'
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'
=======

>>>>>>> origin/rupa
const Settings = async () => {
  const locale = getLocaleOnServer()
  const { t } = await translate(locale, 'dataset-settings')

  return (
    // <div className='bg-white h-full overflow-y-auto'>
<<<<<<< HEAD
    <div className={`bg-white ${getDarkThemeClasses('background')} h-full overflow-y-auto`}>
=======
    <div className='bg-white dark:bg-[#202020] h-full overflow-y-auto'>
>>>>>>> origin/rupa
      <div className='flex justify-start items-center px-6 py-3'>
        <a href='/data-mind' className={cn(s.navBack)} />
        <div>
          {/* <div className='mb-1 text-lg font-semibold text-gray-900'>{t('title')}</div> */}
          <div className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>{t('title')}</div>

          {/* <div className='text-sm text-gray-500'>{t('desc')}</div> */}
          <div className='text-sm text-gray-500 dark:text-[#FCFCFC]'>{t('desc')}</div>
        </div>
      </div>
      <Form />
    </div>
  )
}

export default Settings
