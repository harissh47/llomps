'use client'

import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useSWR from 'swr'
import Link from 'next/link'
import s from './index.module.css'
import { fetchAccountIntegrates } from '@/service/common'

// const titleClassName = `
//   mb-2 text-sm font-medium text-gray-900
// `

const titleClassName = `
  mb-2 text-sm font-medium text-gray-900 dark:text-white
`

export default function IntegrationsPage() {
  const { t } = useTranslation()

  const integrateMap = {
    google: {
      name: t('common.integrations.google'),
      description: t('common.integrations.googleAccount'),
    },
    github: {
      name: t('common.integrations.github'),
      description: t('common.integrations.githubAccount'),
    },
  }

  const { data } = useSWR({ url: '/account/integrates' }, fetchAccountIntegrates)
  const integrates = data?.data?.length ? data.data : []

  return (
    <>
      <div className='mb-8'>
        <div className={titleClassName}>{t('common.integrations.connected')}</div>
        {
          integrates.map(integrate => (
            // <div key={integrate.provider} className='mb-2 flex items-center px-3 py-2 bg-gray-50 border-[0.5px] border-gray-200 rounded-lg'>
            <div key={integrate.provider} className='mb-2 flex items-center px-3 py-2 bg-gray-50 dark:bg-[#3F3F3F] border-[0.5px] border-gray-200 dark:border-[#3F3F3F] rounded-lg'>
              <div className={classNames('w-8 h-8 mr-3 bg-white rounded-lg border border-gray-100 dark:border-[#5f5f5f]', s[`${integrate.provider}-icon`])} />
              <div className='grow'>
                {/* <div className='leading-[21px] text-sm font-medium text-gray-800'>{integrateMap[integrate.provider].name}</div>
                <div className='leading-[18px] text-xs font-normal text-gray-500'>{integrateMap[integrate.provider].description}</div> */}
                <div className='leading-[21px] text-sm font-medium text-gray-800 dark:text-white'>{integrateMap[integrate.provider].name}</div>
                <div className='leading-[18px] text-xs font-normal text-gray-500 dark:text-[#FCFCFC]'>{integrateMap[integrate.provider].description}</div>
              </div>
              {
                !integrate.is_bound && (
                  <Link
                    // className='flex items-center h-8 px-[7px] bg-white rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-pointer'
                    className='flex items-center h-8 px-[7px] bg-white dark:bg-[#5F5F5F] rounded-lg border border-gray-200 dark:border-[#3F3F3F] text-xs font-medium text-gray-700 dark:text-[#FCFCFC] cursor-pointer'
                    href={integrate.link}
                    target='_blank' rel='noopener noreferrer'>
                    {t('common.integrations.connect')}
                  </Link>
                )
              }
            </div>
          ))
        }
      </div>
      {/* <div className='mb-8'>
        <div className={titleClassName}>Add a service </div>
        {
          services.map(service => (
            <div key={service.key} className='mb-2 flex items-center px-3 py-2 bg-gray-50 border-[0.5px] border-gray-200 rounded-lg'>
              <div className={classNames('w-8 h-8 mr-3 bg-white rounded-lg border border-gray-100', s[`${service.key}-icon`])} />
              <div className='grow'>
                <div className='leading-[21px] text-sm font-medium text-gray-800'>{service.name}</div>
                <div className='leading-[18px] text-xs font-normal text-gray-500'>{service.description}</div>
              </div>
              <Button className='text-xs font-medium text-gray-800'>Connect</Button>
            </div>
          ))
        }
      </div> */}
    </>
  )
}
