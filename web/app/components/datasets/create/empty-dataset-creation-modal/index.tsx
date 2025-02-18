'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import cn from 'classnames'
import s from './index.module.css'
import Modal from '@/app/components/base/modal'
import Input from '@/app/components/base/input'
import Button from '@/app/components/base/button'

import { ToastContext } from '@/app/components/base/toast'
import { createEmptyDataset } from '@/service/datasets'

type IProps = {
  show: boolean
  onHide: () => void
}

const EmptyDatasetCreationModal = ({
  show = false,
  onHide,
}: IProps) => {
  const [inputValue, setInputValue] = useState('')
  const { t } = useTranslation()
  const { notify } = useContext(ToastContext)
  const router = useRouter()

  const submit = async () => {
    if (!inputValue) {
      notify({ type: 'error', message: t('datasetCreation.stepOne.modal.nameNotEmpty') })
      return
    }
    if (inputValue.length > 40) {
      notify({ type: 'error', message: t('datasetCreation.stepOne.modal.nameLengthInvaild') })
      return
    }
    try {
      const dataset = await createEmptyDataset({ name: inputValue })
      onHide()
      // router.push(`/datasets/${dataset.id}/documents`)
      router.push(`/data-mind/${dataset.id}/documents`)
    }
    catch (err) {
      notify({ type: 'error', message: t('datasetCreation.stepOne.modal.failed') })
    }
  }

  return (
    <Modal
      isShow={show}
      onClose={onHide}
      className={cn(s.modal, '!max-w-[520px]', 'px-8')}
    >
      <div className={s.modalHeader}>
        {/* <div className={s.title}>{t('datasetCreation.stepOne.modal.title')}</div> */}
        <div className="grow font-semibold text-[20px] leading-[32px] text-[#101828] dark:text-white">
  {t('datasetCreation.stepOne.modal.title')}
</div>
        <span className={s.close} onClick={onHide} />
      </div>
      <div className={s.tip}>{t('datasetCreation.stepOne.modal.tip')}</div>
      <div className={s.form}>
        {/* <div className={s.label}>{t('datasetCreation.stepOne.modal.input')}</div> */}
        <div
  className="mb-2 font-medium text-[14px] leading-[20px] text-[#101828] dark:text-white"
>
  {t('datasetCreation.stepOne.modal.input')}
</div>
        <Input className='!h-8 dark:focus:outline-none
' value={inputValue} placeholder={t('datasetCreation.stepOne.modal.placeholder') || ''} onChange={setInputValue} />
      </div>
      <div className='flex flex-row-reverse'>
        {/* <Button className='w-24 ml-2' type='primary' onClick={submit}>{t('datasetCreation.stepOne.modal.confirmButton')}</Button> */}
        <Button className='w-24 ml-2 ' type='primary' onClick={submit}>{t('datasetCreation.stepOne.modal.confirmButton')}</Button>

        <Button className='w-24 dark:border-0 dark:bg-[#3f3f3f] dark:hover:bg-zinc-800' onClick={onHide}>{t('datasetCreation.stepOne.modal.cancelButton')}</Button>
      </div>
    </Modal>
  )
}

export default EmptyDatasetCreationModal
