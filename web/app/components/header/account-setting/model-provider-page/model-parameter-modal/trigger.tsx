import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import type {
  Model,
  ModelItem,
  ModelProvider,
} from '../declarations'
import { MODEL_STATUS_TEXT } from '../declarations'
import { useLanguage } from '../hooks'
import ModelIcon from '../model-icon'
import ModelName from '../model-name'
import { useProviderContext } from '@/context/provider-context'
import { SlidersH } from '@/app/components/base/icons/src/vender/line/mediaAndDevices'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/line/alertsAndFeedback'
import TooltipPlus from '@/app/components/base/tooltip-plus'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { getDarkThemeClasses } from '@/app/theme'
export type TriggerProps = {
  open?: boolean
  disabled?: boolean
  currentProvider?: ModelProvider | Model
  currentModel?: ModelItem
  providerName?: string
  modelId?: string
  hasDeprecated?: boolean
  modelDisabled?: boolean
  isInWorkflow?: boolean
}
const Trigger: FC<TriggerProps> = ({
  disabled,
  currentProvider,
  currentModel,
  providerName,
  modelId,
  hasDeprecated,
  modelDisabled,
  isInWorkflow,
}) => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { modelProviders } = useProviderContext()

  return (
    <div
      className={cn(
        // 'relative flex items-center px-2 h-8 rounded-lg  cursor-pointer',
        `relative flex items-center px-2 h-8 rounded-lg  cursor-pointer ${getDarkThemeClasses('background3')}`,
        !isInWorkflow && 'border hover:border-[1.5px]',
        !isInWorkflow && (disabled ? 'border-[#4CAF50] bg-[#FFFAEB]' : 'border-[#4CAF50] bg-primary-50'),
        // isInWorkflow && 'pr-[30px] bg-gray-100 border border-[#4CAF50] hover:border-gray-200',
        isInWorkflow && `pr-[30px] bg-gray-100 border border-[#4CAF50] hover:border-gray-200 dark:hover:border-[#3F3F3F]`,
      )}
      // className={cn(
      //   'relative flex items-center px-2 h-8 rounded-lg cursor-pointer',
      //   !isInWorkflow && 'border hover:border-[1.5px]',
      //   !isInWorkflow && (disabled ? 'border-[#A3D9A5] bg-[#E6F4E6]' : 'border-[#4CAF50] bg-green-100'),
      //   isInWorkflow && 'pr-[30px] bg-gray-100 border border-gray-100 hover:border-gray-200',
      // )}
      
    >
      {
        currentProvider && (
          <ModelIcon
            className='mr-1.5 !w-5 !h-5'
            provider={currentProvider}
            modelName={currentModel?.model}
          />
        )
      }
      {
        !currentProvider && (
          <ModelIcon
            className='mr-1.5 !w-5 !h-5'
            provider={modelProviders.find(item => item.provider === providerName)}
            modelName={modelId}
          />
        )
      }
      {
        currentModel && (
          <ModelName
            className='mr-1.5 text-gray-900'
            modelItem={currentModel}
            showMode
            modeClassName={cn(!isInWorkflow ? '!text-[#8AB40A] !border-[#A4BCFD]' : '!text-gray-500 !border-black/8')}
            showFeatures
            featuresClassName={cn(!isInWorkflow ? '!text-[#8AB40A] !border-[#A4BCFD]' : '!text-gray-500 !border-black/8')}
          />
        )
      }
      {
        !currentModel && (
          // <div className='mr-1 text-[13px] font-medium text-gray-900 truncate'>
          <div className='mr-1 text-[13px] font-medium text-gray-900 dark:text-white truncate'>

            {modelId}
          </div>
        )
      }
      {
        disabled
          ? (
            <TooltipPlus
              popupContent={
                hasDeprecated
                  ? t('common.modelProvider.deprecated')
                  : (modelDisabled && currentModel)
                    ? MODEL_STATUS_TEXT[currentModel.status as string][language]
                    : ''
              }
            >
              <AlertTriangle className='w-4 h-4 text-[#F79009]' />
            </TooltipPlus>
          )
          : (
            <SlidersH className={cn(!isInWorkflow ? 'text-indigo-600' : 'text-gray-500', 'shrink-0 w-4 h-4')} />
          )
      }
      {isInWorkflow && (<ChevronDown className='absolute top-[9px] right-2 w-3.5 h-3.5 text-gray-500' />)}
    </div>
  )
}

export default Trigger
