import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'lodash-es'
import cn from 'classnames'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import IndexMethodRadio from '@/app/components/datasets/settings/index-method-radio'
import Button from '@/app/components/base/button'
import type { DataSet } from '@/models/datasets'
import { useToastContext } from '@/app/components/base/toast'
import { updateDatasetSetting } from '@/service/datasets'
import { useModalContext } from '@/context/modal-context'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import type { RetrievalConfig } from '@/types/app'
import RetrievalMethodConfig from '@/app/components/datasets/common/retrieval-method-config'
import EconomicalRetrievalMethodConfig from '@/app/components/datasets/common/economical-retrieval-method-config'
import { ensureRerankModelSelected, isReRankModelSelected } from '@/app/components/datasets/common/check-rerank-model'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/solid/alertsAndFeedback'
import PermissionsRadio from '@/app/components/datasets/settings/permissions-radio'
import ModelSelector from '@/app/components/header/account-setting/model-provider-page/model-selector'
import {
  useModelList,
  useModelListAndDefaultModelAndCurrentProviderAndModel,
} from '@/app/components/header/account-setting/model-provider-page/hooks'
import { ModelTypeEnum } from '@/app/components/header/account-setting/model-provider-page/declarations'

type SettingsModalProps = {
  currentDataset: DataSet
  onCancel: () => void
  onSave: (newDataset: DataSet) => void
}

const rowClass = `
  flex justify-between py-4 flex-wrap gap-y-2
`

const labelClass = `
  flex w-[168px] shrink-0 dark:text-white
`

const SettingsModal: FC<SettingsModalProps> = ({
  currentDataset,
  onCancel,
  onSave,
}) => {
  const { data: embeddingsModelList } = useModelList(ModelTypeEnum.textEmbedding)
  const {
    modelList: rerankModelList,
    defaultModel: rerankDefaultModel,
    currentModel: isRerankDefaultModelVaild,
  } = useModelListAndDefaultModelAndCurrentProviderAndModel(ModelTypeEnum.rerank)
  const { t } = useTranslation()
  const { notify } = useToastContext()
  const ref = useRef(null)

  const { setShowAccountSettingModal } = useModalContext()
  const [loading, setLoading] = useState(false)
  const [localeCurrentDataset, setLocaleCurrentDataset] = useState({ ...currentDataset })
  const [indexMethod, setIndexMethod] = useState(currentDataset.indexing_technique)
  const [retrievalConfig, setRetrievalConfig] = useState(localeCurrentDataset?.retrieval_model_dict as RetrievalConfig)

  const handleValueChange = (type: string, value: string) => {
    setLocaleCurrentDataset({ ...localeCurrentDataset, [type]: value })
  }
  const [isHideChangedTip, setIsHideChangedTip] = useState(false)
  const isRetrievalChanged = !isEqual(retrievalConfig, localeCurrentDataset?.retrieval_model_dict) || indexMethod !== localeCurrentDataset?.indexing_technique

  const handleSave = async () => {
    if (loading)
      return
    if (!localeCurrentDataset.name?.trim()) {
      notify({ type: 'error', message: t('datasetSettings.form.nameError') })
      return
    }
    if (
      !isReRankModelSelected({
        rerankDefaultModel,
        isRerankDefaultModelVaild: !!isRerankDefaultModelVaild,
        rerankModelList,
        retrievalConfig,
        indexMethod,
      })
    ) {
      notify({ type: 'error', message: t('appDebug.datasetConfig.rerankModelRequired') })
      return
    }
    const postRetrievalConfig = ensureRerankModelSelected({
      rerankDefaultModel: rerankDefaultModel!,
      retrievalConfig,
      indexMethod,
    })
    try {
      setLoading(true)
      const { id, name, description, permission } = localeCurrentDataset
      await updateDatasetSetting({
        datasetId: id,
        body: {
          name,
          description,
          permission,
          indexing_technique: indexMethod,
          retrieval_model: postRetrievalConfig,
          embedding_model: localeCurrentDataset.embedding_model,
          embedding_model_provider: localeCurrentDataset.embedding_model_provider,
        },
      })
      notify({ type: 'success', message: t('common.actionMsg.modifiedSuccessfully') })
      onSave({
        ...localeCurrentDataset,
        indexing_technique: indexMethod,
        retrieval_model_dict: postRetrievalConfig,
      })
    }
    catch (e) {
      notify({ type: 'error', message: t('common.actionMsg.modifiedUnsuccessfully') })
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div
      // className='overflow-hidden w-full flex flex-col bg-white border-[0.5px] border-gray-200 rounded-xl shadow-xl'
      className='overflow-hidden w-full flex flex-col bg-white dark:bg-[#3E3E3E] border-[0.5px] border-gray-200 dark:border-[#5F5F5F] rounded-xl shadow-xl'
      style={{
        height: 'calc(100vh - 72px)',
      }}
      ref={ref}
    >
      {/* <div className='shrink-0 flex justify-between items-center pl-6 pr-5 h-14 border-b border-b-gray-100'> */}
      <div className='shrink-0 flex justify-between items-center pl-6 pr-5 h-14 border-b border-b-gray-100 dark:border-b-[#5F5F5F]'>
        {/* <div className='flex flex-col text-base font-semibold text-gray-900'> */}
        <div className='flex flex-col text-base font-semibold text-gray-900 dark:text-white'>
          <div className='leading-6'>{t('datasetSettings.title')}</div>
        </div>
        <div className='flex items-center'>
          <div
            onClick={onCancel}
            className='flex justify-center items-center w-6 h-6 cursor-pointer'
          >
            <XClose className='w-4 h-4 text-gray-500' />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className='p-6 pt-5 border-b overflow-y-auto pb-[68px]' style={{
        borderBottom: 'rgba(0, 0, 0, 0.05)',
      }}>
        <div className={cn(rowClass, 'items-center')}>
          <div className={labelClass}>
            {t('datasetSettings.form.name')}
          </div>
          <input
            value={localeCurrentDataset.name}
            onChange={e => handleValueChange('name', e.target.value)}
            // className='block px-3 w-full h-9 bg-gray-100 rounded-lg text-sm text-gray-900 outline-none appearance-none'
            className='block px-3 w-full h-9 bg-gray-100 dark:bg-[#2C2C2C] rounded-lg text-sm text-gray-900 dark:text-[#FCFCFC] outline-none appearance-none'
            placeholder={t('datasetSettings.form.namePlaceholder') || ''}
          />
        </div>
        <div className={cn(rowClass)}>
          <div className={labelClass}>
            {t('datasetSettings.form.desc')}
          </div>
          <div className='w-full'>
            <textarea
              value={localeCurrentDataset.description || ''}
              onChange={e => handleValueChange('description', e.target.value)}
              // className='block px-3 py-2 w-full h-[88px] rounded-lg bg-gray-100 text-sm outline-none appearance-none resize-none'
                className='block px-3 py-2 w-full h-[88px] rounded-lg bg-gray-100 dark:bg-[#2C2C2C] text-sm dark:text-[#FCFCFC] outline-none appearance-none resize-none'
              placeholder={t('datasetSettings.form.descPlaceholder') || ''}
            />
            {/* <a className='mt-2 flex items-center h-[18px] px-3 text-xs text-gray-500' href="https://docs.dify.ai/features/datasets#how-to-write-a-good-dataset-description" target='_blank' rel='noopener noreferrer'>
              <BookOpenIcon className='w-3 h-[18px] mr-1' />
              {t('datasetSettings.form.descWrite')}
            </a> */}
          </div>
        </div>
        <div className={rowClass}>
          <div className={labelClass}>
            <div>{t('datasetSettings.form.permissions')}</div>
          </div>
          <div className='w-full'>
            <PermissionsRadio
              disable={!localeCurrentDataset?.embedding_available}
              value={localeCurrentDataset.permission}
              onChange={v => handleValueChange('permission', v!)}
              itemClassName='sm:!w-[280px]'
            />
          </div>
        </div>
        {/* <div className="w-full h-0 border-b-[0.5px] border-b-gray-200 my-2"></div> */}
        <div className="w-full h-0 border-b-[0.5px] border-b-gray-200 dark:border-b-[#5F5F5F] my-2"></div>
        <div className={cn(rowClass)}>
          <div className={labelClass}>
            {t('datasetSettings.form.indexMethod')}
          </div>
          <div className='grow'>
            <IndexMethodRadio
              disable={!localeCurrentDataset?.embedding_available}
              value={indexMethod}
              onChange={v => setIndexMethod(v!)}
              itemClassName='sm:!w-[280px]'
            />
          </div>
        </div>
        {indexMethod === 'high_quality' && (
          <div className={cn(rowClass)}>
            <div className={labelClass}>
              {t('datasetSettings.form.embeddingModel')}
            </div>
            <div className='w-full'>
              <div className='w-full h-9 rounded-lg bg-gray-100 opacity-60'>
                <ModelSelector
                  readonly
                  defaultModel={{
                    provider: localeCurrentDataset.embedding_model_provider,
                    model: localeCurrentDataset.embedding_model,
                  }}
                  modelList={embeddingsModelList}
                />
              </div>
              {/* <div className='mt-2 w-full text-xs leading-6 text-gray-500'> */}
              <div className='mt-2 w-full text-xs leading-6 text-gray-500 dark:text-[#6B7082]'>
                {t('datasetSettings.form.embeddingModelTip')}
                {/* <span className='text-[#155eef] cursor-pointer' onClick={() => setShowAccountSettingModal({ payload: 'provider' })}>{t('datasetSettings.form.embeddingModelTipLink')}</span> */}

                <span className='text-[#8AB40A] cursor-pointer' onClick={() => setShowAccountSettingModal({ payload: 'provider' })}>{t('datasetSettings.form.embeddingModelTipLink')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Retrieval Method Config */}
        <div className={rowClass}>
          <div className={labelClass}>
            <div>
              <div>{t('datasetSettings.form.retrievalSetting.title')}</div>
              {/* <div className='leading-[18px] text-xs font-normal text-gray-500'> */}
              <div className='leading-[18px] text-xs font-normal text-gray-500 dark:text-[#6B7082]'>
                {/* <a target='_blank' rel='noopener noreferrer' href='https://docs.dify.ai/features/retrieval-augment' className='text-[#155eef]'>{t('datasetSettings.form.retrievalSetting.learnMore')}</a> */}
                {t('datasetSettings.form.retrievalSetting.description')}
              </div>
            </div>
          </div>
          <div className='w-[480px]'>
            {indexMethod === 'high_quality'
              ? (
                <RetrievalMethodConfig
                  value={retrievalConfig}
                  onChange={setRetrievalConfig}
                />
              )
              : (
                <EconomicalRetrievalMethodConfig
                  value={retrievalConfig}
                  onChange={setRetrievalConfig}
                />
              )}
          </div>
        </div>
      </div>
      {isRetrievalChanged && !isHideChangedTip && (
        <div className='absolute z-10 left-[30px] right-[30px] bottom-[76px] flex h-10 items-center px-3 rounded-lg border border-[#FEF0C7] bg-[#FFFAEB] shadow-lg justify-between'>
          <div className='flex items-center'>
            <AlertTriangle className='mr-1 w-3 h-3 text-[#F79009]' />
            <div className='leading-[18px] text-xs font-medium text-gray-700'>{t('appDebug.datasetConfig.retrieveChangeTip')}</div>
          </div>
          <div className='p-1 cursor-pointer' onClick={(e) => {
            setIsHideChangedTip(true)
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
          }}>
            <XClose className='w-4 h-4 text-gray-500 ' />
          </div>
        </div>
      )}

      <div
        // className='sticky z-[5] bottom-0 w-full flex justify-end py-4 px-6 border-t bg-white '
        className='sticky z-[5] bottom-0 w-full flex justify-end py-4 px-6 border-t dark:border-t-[#5F5F5F] bg-white dark:bg-[#3E3E3E] '
        style={{
          borderColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <Button
          onClick={onCancel}
          className='mr-2 text-sm font-medium dark:bg-[#3E3E3E] dark:hover:bg-zinc-800 dark:border-[#5F5F5F]'
        >
          {t('common.operation.cancel')}
        </Button>
        <Button
          type='primary'
          className='text-sm font-medium'
          disabled={loading}
          onClick={handleSave}
        >
          {t('common.operation.save')}
        </Button>
      </div>
    </div>
  )
}

export default SettingsModal
