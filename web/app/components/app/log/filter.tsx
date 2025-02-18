'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import useSWR from 'swr'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import type { QueryParam } from './index'
import { SimpleSelect } from '@/app/components/base/select'
import { fetchAnnotationsCount } from '@/service/log'
dayjs.extend(quarterOfYear)

const today = dayjs()

export const TIME_PERIOD_LIST = [
  { value: 0, name: 'today' },
  { value: 7, name: 'last7days' },
  { value: 28, name: 'last4weeks' },
  { value: today.diff(today.subtract(3, 'month'), 'day'), name: 'last3months' },
  { value: today.diff(today.subtract(12, 'month'), 'day'), name: 'last12months' },
  { value: today.diff(today.startOf('month'), 'day'), name: 'monthToDate' },
  { value: today.diff(today.startOf('quarter'), 'day'), name: 'quarterToDate' },
  { value: today.diff(today.startOf('year'), 'day'), name: 'yearToDate' },
  { value: 'all', name: 'allTime' },
]

type IFilterProps = {
  appId: string
  queryParams: QueryParam
  setQueryParams: (v: QueryParam) => void
}

const Filter: FC<IFilterProps> = ({ appId, queryParams, setQueryParams }: IFilterProps) => {
  const { data } = useSWR({ url: `/apps/${appId}/annotations/count` }, fetchAnnotationsCount)
  const { t } = useTranslation()
  if (!data)
    return null
  return (
    <div className='flex flex-row flex-wrap gap-y-2 gap-x-4 items-center mb-4 text-gray-900 text-base'>
      <SimpleSelect
        items={TIME_PERIOD_LIST.map(item => ({ value: item.value, name: t(`appLog.filter.period.${item.name}`) }))}
        className='mt-0 !w-40'
        onSelect={(item) => {
          setQueryParams({ ...queryParams, period: item.value })
        }}
        defaultValue={queryParams.period} />
      <div className="relative rounded-md">
        <SimpleSelect
          defaultValue={'all'}
          className='!w-[300px]'
          onSelect={
            (item) => {
              setQueryParams({ ...queryParams, annotation_status: item.value as string })
            }
          }
          items={[{ value: 'all', name: t('appLog.filter.annotation.all') },
            { value: 'annotated', name: t('appLog.filter.annotation.annotated', { count: data?.count }) },
            { value: 'not_annotated', name: t('appLog.filter.annotation.not_annotated') }]}
        />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="query"
          // className="block w-[240px] bg-gray-100 shadow-sm rounded-md border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-200 focus-visible:outline-none sm:text-sm sm:leading-6"
          className="block w-[240px] bg-gray-100 dark:bg-[#2c2c2c] shadow-sm rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white focus:ring-1 focus:ring-inset focus:ring-gray-200 dark:focus:ring-[#5f5f5f] focus-visible:outline-none sm:text-sm sm:leading-6"
          placeholder={t('common.operation.search')!}
          value={queryParams.keyword}
          onChange={(e) => {
            setQueryParams({ ...queryParams, keyword: e.target.value })
          }}
        />
      </div>
    </div>
  )
}

export default Filter
