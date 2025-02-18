'use client'
import type { FC } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import { useBoolean, useHover } from 'ahooks'
import { useTranslation } from 'react-i18next'
import InputVarTypeIcon from '../../_base/components/input-var-type-icon'
import type { InputVar, MoreInfo } from '@/app/components/workflow/types'
import { Variable02 } from '@/app/components/base/icons/src/vender/solid/development'
import { Edit03 } from '@/app/components/base/icons/src/vender/solid/general'
import { Trash03 } from '@/app/components/base/icons/src/vender/line/general'
import ConfigVarModal from '@/app/components/app/configuration/config-var/config-modal'
import Switch from '@/app/components/base/switch'
import { Checked } from '@/app/components/base/icons/src/public/model'
import { getDarkThemeClasses } from '@/app/theme'
type Props = {
  readonly: boolean
  payload: InputVar
  onChange?: (item: InputVar, moreInfo?: MoreInfo) => void
  onRemove?: () => void
  rightContent?: JSX.Element
  varKeys?: string[]
  fieldVisibility?: boolean
  handleFieldVisibility?: (visible: boolean) => void
}

const VarItem: FC<Props> = ({
  readonly,
  payload,
  onChange = () => { },
  onRemove = () => { },
  rightContent,
  varKeys = [],
  fieldVisibility,
  handleFieldVisibility,
}) => {
  const { t } = useTranslation()

  const ref = useRef(null)
  const isHovering = useHover(ref)
  const [isShowEditVarModal, {
    setTrue: showEditVarModal,
    setFalse: hideEditVarModal,
  }] = useBoolean(false)

  const [isSwitchOn, setIsSwitchOn] = useState(fieldVisibility || false)

  const handlePayloadChange = useCallback((payload: InputVar, moreInfo?: MoreInfo) => {
    onChange(payload, moreInfo)
    hideEditVarModal()
  }, [onChange, hideEditVarModal])

  // const handleSwitchChange = (defaultValue: boolean) => {
  //   setIsSwitchOn(defaultValue)
  //   if (handleFieldVisibility)
  //     handleFieldVisibility(defaultValue)
  // }
  return (
    // <div ref={ref} className='flex items-center h-8 justify-between px-2.5 bg-white rounded-lg border border-gray-200 shadow-xs cursor-pointer hover:shadow-md'>
      <div ref={ref} className={`flex items-center h-8 justify-between px-2.5 bg-white ${getDarkThemeClasses('background1')} rounded-lg border border-gray-200 ${getDarkThemeClasses('border')} shadow-xs cursor-pointer hover:shadow-md ${getDarkThemeClasses('hovershadow2')}`}>
      <div className='flex items-center space-x-1 grow w-0'>
        <Variable02 className='w-3.5 h-3.5 text-primary-500' />
        {/* <div title={payload.variable} className='shrink-0 max-w-[130px] truncate text-[13px] font-medium text-gray-700'>{payload.variable}</div> */}
        <div title={payload.variable} className={`shrink-0 max-w-[130px] truncate text-[13px] font-medium text-gray-700 ${getDarkThemeClasses('sub_text1')}`}>{payload.variable}</div>
        {payload.label && (<><div className='shrink-0 text-xs font-medium text-gray-400'>·</div>
          <div title={payload.label as string} className='max-w-[130px] truncate text-[13px] font-medium text-gray-500'>{payload.label as string}</div>
        </>)}
      </div>
      <div className='shrink-0 ml-2 flex items-center'>
        <div className='shrink-0 ml-2 flex items-center space-x-2'>
          {rightContent || (<>
            {(!isHovering || readonly)
              ? (
                <>
                  {payload.required && (
                    <div className='mr-2 text-xs font-normal text-gray-500'>{t('workflow.nodes.start.required')}</div>
                  )}
                  <InputVarTypeIcon type={payload.type} className='w-3.5 h-3.5 text-gray-500' />
                </>
              )
              : (!readonly && (
                <>
                  <div onClick={showEditVarModal} className='mr-1 p-1 rounded-md cursor-pointer hover:bg-black/5'>
                    <Edit03 className='w-4 h-4 text-gray-500' />
                  </div>
                  <div onClick={onRemove} className='p-1 rounded-md cursor-pointer hover:bg-black/5'>
                    <Trash03 className='w-4 h-4 text-gray-500' />
                  </div>
                </>
              ))}
            {/* <Switch defaultValue={isSwitchOn}
              onChange={handleSwitchChange}
              size='sm'
            /> */}
          </>)}
          {/* {!readonly && (
            <Switch
              defaultValue={fieldVisibility}
              onChange={handleFieldVisibility}
              size='md'
              disabled={readonly}
            />
          )} */}

        </div>
        {
          isShowEditVarModal && (
            <ConfigVarModal
              isShow
              payload={payload}
              onClose={hideEditVarModal}
              onConfirm={handlePayloadChange}
              varKeys={varKeys}
            />
          )
        }
      </div>
    </div>
  )
}
export default React.memo(VarItem)
