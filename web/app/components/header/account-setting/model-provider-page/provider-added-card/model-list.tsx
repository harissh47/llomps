import type { FC } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  CustomConfigurationModelFixedFields,
  ModelItem,
  ModelProvider,
} from '../declarations'
import {
  ConfigurationMethodEnum,
} from '../declarations'
// import Tab from './tab'
import AddModelButton from './add-model-button'
import ModelListItem from './model-list-item'
import { ChevronDownDouble } from '@/app/components/base/icons/src/vender/line/arrows'
import { useModalContextSelector } from '@/context/modal-context'

type ModelListProps = {
  provider: ModelProvider
  models: ModelItem[]
  onCollapse: () => void
  onConfig: (currentCustomConfigurationModelFixedFields?: CustomConfigurationModelFixedFields) => void
  onChange?: (provider: string) => void
}
const ModelList: FC<ModelListProps> = ({
  provider,
  models,
  onCollapse,
  onConfig,
  onChange,
}) => {
  const { t } = useTranslation()
  const configurativeMethods = provider.configurate_methods.filter(method => method !== ConfigurationMethodEnum.fetchFromRemote)
  const isConfigurable = configurativeMethods.includes(ConfigurationMethodEnum.customizableModel)

  const setShowModelLoadBalancingModal = useModalContextSelector(state => state.setShowModelLoadBalancingModal)
  const onModifyLoadBalancing = useCallback((model: ModelItem) => {
    setShowModelLoadBalancingModal({
      provider,
      model: model!,
      open: !!model,
      onClose: () => setShowModelLoadBalancingModal(null),
      onSave: onChange,
    })
  }, [onChange, provider, setShowModelLoadBalancingModal])

  return (
    // <div className='px-2 pb-2 rounded-b-xl'>
    <div className='px-2 pb-2 rounded-b-xl dark:bg-[#333333]'>
      {/* <div className='py-1 bg-white rounded-lg'> */}
      <div className='py-1 bg-white rounded-lg dark:bg-[#3f3f3f]'>
        <div className='flex items-center pl-1 pr-[3px]'>
          <span className='group shrink-0 flex items-center mr-2'>
            <span className='group-hover:hidden pl-1 pr-1.5 h-6 leading-6 text-xs font-medium text-gray-500'>
              {t('common.modelProvider.modelsNum', { num: models.length })}
            </span>
            <span
              className='hidden group-hover:inline-flex items-center pl-1 pr-1.5 h-6 text-xs font-medium text-gray-500 bg-gray-50 dark:bg-zinc-800 cursor-pointer rounded-lg  dark:hover:bg-zinc-800'
              onClick={() => onCollapse()}
            >
              <ChevronDownDouble className='mr-0.5 w-3 h-3 rotate-180' />
              {t('common.modelProvider.collapse')}
            </span>
          </span>
          {/* {
            isConfigurable && canSystemConfig && (
              <span className='flex items-center'>
                <Tab active='all' onSelect={() => {}} />
              </span>
            )
          } */}
          {
            isConfigurable && (
              <div className='grow flex justify-end'>
                <AddModelButton onClick={() => onConfig()} />
              </div>
            )
          }
        </div>
        {
          models.map(model => (
            <ModelListItem
              key={model.model}
              {...{
                model,
                provider,
                isConfigurable,
                onConfig,
                onModifyLoadBalancing,
              }}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ModelList
