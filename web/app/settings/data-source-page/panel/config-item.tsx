'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
// import Indicator from '../../../indicator'
import Indicator from '@/app/components/header/indicator'
import Operate from '../data-source-notion/operate'
import { DataSourceType } from './types'
import s from './style.module.css'
import { Trash03 } from '@/app/components/base/icons/src/vender/line/general'

export type ConfigItemType = {
  id: string
  logo: any
  name: string
  isActive: boolean
  notionConfig?: {
    total: number
  }
}

type Props = {
  type: DataSourceType
  payload: ConfigItemType
  onRemove: () => void
  notionActions?: {
    onChangeAuthorizedPage: () => void
  }
}

const ConfigItem: FC<Props> = ({
  type,
  payload,
  onRemove,
  notionActions,
}) => {
  const { t } = useTranslation()
  const isNotion = type === DataSourceType.notion
  const isWebsite = type === DataSourceType.website
  const onChangeAuthorizedPage = notionActions?.onChangeAuthorizedPage || function () { }

  return (
    <div className={cn(s['workspace-item'], 'flex items-center mb-1 py-1 pr-1 bg-white rounded-lg')} key={payload.id}>
      <payload.logo className='ml-3 mr-1.5' />
      <div className='grow py-[7px] leading-[18px] text-[13px] font-medium text-gray-700 truncate' title={payload.name}>{payload.name}</div>
      {
        payload.isActive
          ? <Indicator className='shrink-0 mr-[6px]' />
          : <Indicator className='shrink-0 mr-[6px]' color='yellow' />
      }
      <div className='shrink-0 mr-3 text-xs font-medium uppercase'>
        {
          payload.isActive
            ? t(isNotion ? 'common.dataSource.notion.connected' : 'common.dataSource.website.active')
            : t(isNotion ? 'common.dataSource.notion.disconnected' : 'common.dataSource.website.inactive')
        }
      </div>
      <div className='mr-2 w-[1px] h-3 bg-gray-100' />
      {isNotion && (
        <Operate payload={{
          id: payload.id,
          total: payload.notionConfig?.total || 0,
        }} onAuthAgain={onChangeAuthorizedPage}
        />
      )}

      {
        isWebsite && (
          <div className='p-2 text-gray-500 cursor-pointer rounded-md hover:bg-black/5' onClick={onRemove} >
            <Trash03 className='w-4 h-4 ' />
          </div>
        )
      }

    </div>
  )
}
export default React.memo(ConfigItem)
