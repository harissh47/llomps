import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  CustomConfigurationModelFixedFields,
  ModelItem,
  ModelProvider,
} from '../declarations'
import { ConfigurationMethodEnum } from '../declarations'
import {
  DEFAULT_BACKGROUND_COLOR,
  MODEL_PROVIDER_QUOTA_GET_PAID,
  modelTypeFormat,
} from '../utils'
import ProviderIcon from '../provider-icon'
import ModelBadge from '../model-badge'
import CredentialPanel from './credential-panel'
import QuotaPanel from './quota-panel'
import ModelList from './model-list'
import AddModelButton from './add-model-button'
import { ChevronDownDouble } from '@/app/components/base/icons/src/vender/line/arrows'
import { Loading02 } from '@/app/components/base/icons/src/vender/line/general'
import { fetchModelProviderModelList } from '@/service/common'
import { useEventEmitterContextContext } from '@/context/event-emitter'
import { IS_CE_EDITION } from '@/config'

export const UPDATE_MODEL_PROVIDER_CUSTOM_MODEL_LIST = 'UPDATE_MODEL_PROVIDER_CUSTOM_MODEL_LIST'
type ProviderAddedCardProps = {
  provider: ModelProvider
  onOpenModal: (configurationMethod: ConfigurationMethodEnum, currentCustomConfigurationModelFixedFields?: CustomConfigurationModelFixedFields) => void
}
const ProviderAddedCard: FC<ProviderAddedCardProps> = ({
  provider,
  onOpenModal,
}) => {
  const { t } = useTranslation()
  const { eventEmitter } = useEventEmitterContextContext()
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [modelList, setModelList] = useState<ModelItem[]>([])
  const configurationMethods = provider.configurate_methods.filter(method => method !== ConfigurationMethodEnum.fetchFromRemote)
  const systemConfig = provider.system_configuration
  const hasModelList = fetched && !!modelList.length
  const showQuota = systemConfig.enabled && [...MODEL_PROVIDER_QUOTA_GET_PAID].includes(provider.provider) && !IS_CE_EDITION

  const getModelList = async (providerName: string) => {
    if (loading)
      return
    try {
      setLoading(true)
      const modelsData = await fetchModelProviderModelList(`/workspaces/current/model-providers/${providerName}/models`)
      setModelList(modelsData.data)
      setCollapsed(false)
      setFetched(true)
    }
    finally {
      setLoading(false)
    }
  }
  const handleOpenModelList = () => {
    if (fetched) {
      setCollapsed(false)
      return
    }

    getModelList(provider.provider)
  }

  eventEmitter?.useSubscription((v: any) => {
    if (v?.type === UPDATE_MODEL_PROVIDER_CUSTOM_MODEL_LIST && v.payload === provider.provider)
      getModelList(v.payload)
  })

  return (
    <div
      // className='mb-2 rounded-xl border-[0.5px] border-black/5 shadow-xs'
      className='mb-2 rounded-xl border-[0.5px] border-black/5 dark:border-[#5f5f5f] shadow-xs'
      style={{ background: provider.background || DEFAULT_BACKGROUND_COLOR }}
    >
      {/* <div className='flex pl-3 py-2 pr-2 rounded-t-xl'> */}
      <div className='flex pl-3 py-2 pr-2 rounded-t-xl dark:bg-[#333333]'>
        <div className='grow px-1 pt-1 pb-0.5'>
          <ProviderIcon
            className='mb-2'
            provider={provider}
          />
          <div className='flex gap-0.5'>
            {
              provider.supported_model_types.map(modelType => (
                <ModelBadge key={modelType}>
                  {modelTypeFormat(modelType)}
                </ModelBadge>
              ))
            }
          </div>
        </div>
        {
          showQuota && (
            <QuotaPanel
              provider={provider}
            />
          )
        }
        {
          configurationMethods.includes(ConfigurationMethodEnum.predefinedModel) && (
            <CredentialPanel
              onSetup={() => onOpenModal(ConfigurationMethodEnum.predefinedModel)}
              provider={provider}
            />
          )
        }
      </div>
      {
        collapsed && (
          // <div className='group flex items-center justify-between pl-2 py-1.5 pr-[11px] border-t border-t-black/5 bg-white/30 text-xs font-medium text-gray-500'>
          <div className='group flex items-center justify-between pl-2 py-1.5 pr-[11px] border-t border-t-black/5 bg-white/30 dark:bg-[#3F3F3F] dark:border-t-[#202020] dark:rounded-b-xl text-xs font-medium text-gray-500'>
            <div className='group-hover:hidden dark:text-gray-500 pl-1 pr-1.5 h-6 leading-6'>
              {
                hasModelList
                  ? t('common.modelProvider.modelsNum', { num: modelList.length })
                  : t('common.modelProvider.showModels')
              }
            </div>
            <div
              className='hidden group-hover:flex items-center pl-1 pr-1.5 h-6 rounded-lg hover:bg-white dark:hover:bg-zinc-800 cursor-pointer'
              onClick={handleOpenModelList}
            >
              <ChevronDownDouble className='mr-0.5 w-3 h-3' />
              {
                hasModelList
                  ? t('common.modelProvider.showModelsNum', { num: modelList.length })
                  : t('common.modelProvider.showModels')
              }
              {
                loading && (
                  <Loading02 className='ml-0.5 animate-spin w-3 h-3' />
                )
              }
            </div>
            {
              configurationMethods.includes(ConfigurationMethodEnum.customizableModel) && (
                <AddModelButton
                  onClick={() => onOpenModal(ConfigurationMethodEnum.customizableModel)}
                  className='hidden group-hover:flex group-hover:text-primary-600'
                />
              )
            }
          </div>
        )
      }
      {
        !collapsed && (
          <ModelList
            provider={provider}
            models={modelList}
            onCollapse={() => setCollapsed(true)}
            onConfig={currentCustomConfigurationModelFixedFields => onOpenModal(ConfigurationMethodEnum.customizableModel, currentCustomConfigurationModelFixedFields)}
            onChange={(provider: string) => getModelList(provider)}
          />
        )
      }
    </div>
  )
}

export default ProviderAddedCard
