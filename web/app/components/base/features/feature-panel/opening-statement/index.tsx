/* eslint-disable multiline-ternary */
'use client'
import type { FC } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import produce from 'immer'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'ahooks'
import { ReactSortable } from 'react-sortablejs'
import {
  // handleImageUpload,
  // handleCarouselImageUpload,
  useFeatures,
  useFeaturesStore,
} from '../../hooks'
import type { OnFeaturesChange } from '../../types'
import Panel from '@/app/components/app/configuration/base/feature-panel'
import Button from '@/app/components/base/button'
import OperationBtn from '@/app/components/app/configuration/base/operation-btn'
import { getInputKeys } from '@/app/components/base/block-input'
import ConfirmAddVar from '@/app/components/app/configuration/config-prompt/confirm-add-var'
import { getNewVar } from '@/utils/var'
import { varHighlightHTML } from '@/app/components/app/configuration/base/var-highlight'
import { Edit02, Plus, Trash03 } from '@/app/components/base/icons/src/vender/line/general'
import type { PromptVariable } from '@/models/debug'
import Switch from '../../../switch'
import { useParams } from 'next/navigation'
import { useToastContext } from '../../../toast'
import { upload } from '@/service/base'

// const MAX_QUESTION_NUM = 7
const MAX_QUESTION_NUM = 5

export type OpeningStatementProps = {
  onChange?: OnFeaturesChange
  readonly?: boolean
  promptVariables?: PromptVariable[]
  onAutoAddPromptVariable: (variable: PromptVariable[]) => void
}

// regex to match the {{}} and replace it with a span
const regex = /\{\{([^}]+)\}\}/g

const OpeningStatement: FC<OpeningStatementProps> = ({
  onChange,
  readonly,
  promptVariables = [],
  onAutoAddPromptVariable,
}) => {
  const { t } = useTranslation()
  const featureStore = useFeaturesStore()
  const openingStatement = useFeatures(s => s.features.opening)
  const value = openingStatement?.opening_statement || ''
  const suggestedQuestions = openingStatement?.suggested_questions || []
  const showCarousel = openingStatement?.show_carousel || false
  const showOpeningContainer = openingStatement?.show_openingcontainer || false
  const carouselImages = openingStatement?.carousel_images || []
  const [notIncludeKeys, setNotIncludeKeys] = useState<string[]>([])
  const params = useParams()
  const { notify } = useToastContext()

  const hasValue = !!(value || '').trim()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [isFocus, { setTrue: didSetFocus, setFalse: setBlur }] = useBoolean(false)

  const setFocus = () => {
    didSetFocus()
    setTimeout(() => {
      const input = inputRef.current
      if (input) {
        input.focus()
        input.setSelectionRange(input.value.length, input.value.length)
      }
    }, 0)
  }

  const handleCarouselSwitchChange = (enabled: boolean) => {
    if (enabled) {
      setTempShowCarousel(true)
      setTempShowOpeningContainer(false)
    }
    else
      setTempShowCarousel(false)
  }

  const handleContainerSwitchChange = (enabled: boolean) => {
    if (enabled) {
      setTempShowOpeningContainer(true)
      setTempShowCarousel(false)
    }
    else
      setTempShowOpeningContainer(false)
  }

  const [tempValue, setTempValue] = useState(value)
  useEffect(() => {
    setTempValue(value || '')
  }, [value])

  const [tempSuggestedQuestions, setTempSuggestedQuestions] = useState(suggestedQuestions || [])
  const [tempShowCarousel, setTempShowCarousel] = useState(showCarousel || false)
  const [tempShowOpeningContainer, setTempShowOpeningContainer] = useState(showOpeningContainer || false)
  const [tempCarouselImages, setTempCarouselImages] = useState(carouselImages || [])
  const notEmptyQuestions = tempSuggestedQuestions.filter(question => !!question && question.trim())
  const coloredContent = (tempValue || '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(regex, varHighlightHTML({ name: '$1' })) // `<span class="${highLightClassName}">{{$1}}</span>`
    .replace(/\n/g, '<br />')

  const handleCarouselImageUpload = (e: any, question: string) => {
    const file: File = e.target.files[0]

    if (file && file.type.startsWith('image/')) {
      console.log(file)

      const formData = new FormData()
      formData.append('file', file)
      const onProgress = (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const percent = Math.floor(e.loaded / e.total * 100)
          // onProgressCallback(percent)
          console.log(percent)
        }
      }

      upload({
        xhr: new XMLHttpRequest(),
        data: formData,
        onprogress: onProgress,
      }, !!params.token, undefined)
        .then((res) => {
          console.log(res)
          setTempCarouselImages(prevImages => {
            const imageIndex = prevImages.findIndex(image => image.question === question)

            if (imageIndex !== -1) {
              const updatedImages = [...prevImages]
              updatedImages[imageIndex].imageId = res.id
              updatedImages[imageIndex].imageName = res.name
              updatedImages[imageIndex].question = question

              return updatedImages
            } else {
              const newImage = {
                imageId: res.id,
                imageName: res.name,
                question: question,
              }

              return [...prevImages, newImage]
            }
          })

          console.log(tempCarouselImages)
          notify({ type: 'success', message: 'Image uploaded' })
        })
        .catch(() => {
          notify({ type: 'error', message: 'Image upload failed, please upload again.' })
        })
    }
  }

  const handleEdit = () => {
    if (readonly)
      return
    setFocus()
  }

  const [isShowConfirmAddVar, { setTrue: showConfirmAddVar, setFalse: hideConfirmAddVar }] = useBoolean(false)

  const handleCancel = () => {
    setBlur()
    setTempValue(value)
    setTempSuggestedQuestions(suggestedQuestions)
    setTempShowCarousel(showCarousel)
    setTempShowOpeningContainer(showOpeningContainer)
    setTempCarouselImages(carouselImages)
  }

  const handleConfirm = () => {
    const keys = getInputKeys(tempValue)
    const promptKeys = promptVariables.map(item => item.key)
    let notIncludeKeys: string[] = []

    if (promptKeys.length === 0) {
      if (keys.length > 0)
        notIncludeKeys = keys
    }
    else {
      notIncludeKeys = keys.filter(key => !promptKeys.includes(key))
    }

    if (notIncludeKeys.length > 0) {
      setNotIncludeKeys(notIncludeKeys)
      showConfirmAddVar()
      return
    }
    setBlur()
    const { getState } = featureStore!
    const {
      features,
      setFeatures,
    } = getState()

    const newFeatures = produce(features, (draft) => {
      if (draft.opening) {
        draft.opening.opening_statement = tempValue
        draft.opening.suggested_questions = tempSuggestedQuestions
        draft.opening.show_carousel = tempShowCarousel
        draft.opening.show_openingcontainer = tempShowOpeningContainer
        draft.opening.carousel_images = tempCarouselImages
      }
    })
    setFeatures(newFeatures)

    console.log(newFeatures)

    if (onChange)
      onChange(newFeatures)
  }

  const cancelAutoAddVar = () => {
    const { getState } = featureStore!
    const {
      features,
      setFeatures,
    } = getState()

    const newFeatures = produce(features, (draft) => {
      if (draft.opening)
        draft.opening.opening_statement = tempValue
    })
    setFeatures(newFeatures)

    if (onChange)
      onChange(newFeatures)
    hideConfirmAddVar()
    setBlur()
  }

  const autoAddVar = () => {
    const { getState } = featureStore!
    const {
      features,
      setFeatures,
    } = getState()

    const newFeatures = produce(features, (draft) => {
      if (draft.opening)
        draft.opening.opening_statement = tempValue
    })
    setFeatures(newFeatures)
    if (onChange)
      onChange(newFeatures)
    onAutoAddPromptVariable([...notIncludeKeys.map(key => getNewVar(key, 'string'))])
    hideConfirmAddVar()
    setBlur()
  }

  const headerRight = !readonly ? (
    isFocus ? (
      <div className='flex items-center space-x-1'>
        <div className='flex items-center space-x-1'>
          {/* <label className='text-xs font-medium text-gray-700 '> */}
          <label className='text-xs font-medium text-gray-700 dark:text-[#FCFCFC] '>

            Show Carousel
          </label>
          <Switch
            defaultValue={tempShowCarousel}
            // onChange={(enabled: boolean) => {
            //   setTempShowCarousel(enabled)
            // }}
            onChange={handleCarouselSwitchChange}
            size='md'
            disabled={readonly}
          />
        </div>
        <div className='flex items-center space-x-1'>
          {/* <label className='text-xs font-medium text-gray-700'> */}
          <label className='text-xs font-medium text-gray-700 dark:text-[#FCFCFC]'>

            Show Container
          </label>
          <Switch
            defaultValue={tempShowOpeningContainer}
            // onChange={(enabled: boolean) => {
            //   setTempShowOpeningContainer(enabled)
            // }}
            onChange={handleContainerSwitchChange}
            size='md'
            disabled={readonly}
          />
        </div>
        {/* <div className='px-2 leading-[18px] text-xs font-medium text-gray-700 cursor-pointer' onClick={handleCancel}>{t('common.operation.cancel')}</div> */}
        <div className='px-2 leading-[18px] text-xs font-medium text-gray-700 dark:text-[#FCFCFC] cursor-pointer' onClick={handleCancel}>{t('common.operation.cancel')}</div>

        <Button className='!h-8 !px-3 text-xs' onClick={handleConfirm} type="primary">{t('common.operation.save')}</Button>
      </div>
    ) : (
      <OperationBtn type='edit' actionName={hasValue ? '' : t('appDebug.openingStatement.writeOpener') as string} onClick={handleEdit} />
    )
  ) : null

  const renderQuestions = () => {
    return isFocus ? (
      <div>
        <div className='flex items-center py-2'>
          {/* <div className='shrink-0 flex space-x-0.5 leading-[18px] text-xs font-medium text-gray-500'> */}
          <div className='shrink-0 flex space-x-0.5 leading-[18px] text-xs font-medium text-gray-500 dark:text-[#FCFCFC]'>

            <div className='uppercase'>{t('appDebug.openingStatement.openingQuestion')}</div>
            <div>·</div>
            <div>{tempSuggestedQuestions.length}/{MAX_QUESTION_NUM}</div>
          </div>
          <div className='ml-3 grow w-0 h-px bg-[#243, 244, 246]'></div>
        </div>
        <ReactSortable
          className="space-y-1"
          list={tempSuggestedQuestions.map((name, index) => {
            return {
              id: index,
              name,
            }
          })}
          setList={list => setTempSuggestedQuestions(list.map(item => item.name))}
          handle='.handle'
          ghostClass="opacity-50"
          animation={150}
        >
          {tempSuggestedQuestions.map((question, index) => {
            return (
              // <div className='group relative rounded-lg border border-gray-200 flex items-center pl-2.5 hover:border-gray-300 hover:bg-white' key={index}>
              <div className='group relative rounded-lg border border-gray-200 flex items-center pl-2.5 hover:border-gray-300 hover:bg-white dark:hover:bg-zinc-800 dark:!text-white' key={index}>

                <div className='handle flex items-center justify-center w-4 h-4 cursor-grab'>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 2C1.55228 2 2 1.55228 2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2ZM1 6C1.55228 6 2 5.55228 2 5C2 4.44772 1.55228 4 1 4C0.447715 4 0 4.44772 0 5C0 5.55228 0.447715 6 1 6ZM6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6ZM2 9C2 9.55229 1.55228 10 1 10C0.447715 10 0 9.55229 0 9C0 8.44771 0.447715 8 1 8C1.55228 8 2 8.44771 2 9ZM5 10C5.55228 10 6 9.55229 6 9C6 8.44771 5.55228 8 5 8C4.44772 8 4 8.44771 4 9C4 9.55229 4.44772 10 5 10Z" fill="#98A2B3" />
                  </svg>
                </div>
                <input
                  type="input"
                  value={question || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    setTempSuggestedQuestions(tempSuggestedQuestions.map((item, i) => {
                      if (index === i)
                        return value

                      return item
                    }))
                  }}
                  // className={'w-full max-w-24 overflow-x-auto pl-1.5 pr-8 text-sm leading-9 text-gray-900 border-0 grow h-9 bg-transparent focus:outline-none cursor-pointer rounded-lg'}
                  className={'w-full max-w-24 overflow-x-auto pl-1.5 pr-8 text-sm leading-9 text-gray-900 dark:text-[#FCFCFC] border-0 grow h-9 bg-transparent focus:outline-none cursor-pointer rounded-lg'}
                  style={{ maxWidth: '23rem', textOverflow: 'ellipsis' }}
                />

                <div
                  className='block absolute top-1/2 translate-y-[-50%] right-1.5 p-1 rounded-md cursor-pointer hover:bg-[#FEE4E2] hover:text-[#D92D20]'
                  onClick={() => {
                    setTempSuggestedQuestions(tempSuggestedQuestions.filter((_, i) => index !== i))
                    setTempCarouselImages(tempCarouselImages.filter((img, _) => img.question !== question))
                  }}
                >
                  <Trash03 className='w-3.5 h-3.5' />
                </div>

                {/* <div className='block absolute top-1/2 translate-y-[-50%] right-12 p-1 rounded-md'>
                  {`${tempCarouselImages.filter((image, _) => image.question === question)?.[0]?.imageName ?? ''}`}
                </div> */}
                <div className='block absolute top-1/2 translate-y-[-50%] right-12 p-1 rounded-md' style={{ right: '2rem' }}>
                  {tempCarouselImages.some((image) => image.question === question) && (
                    <span className='mr-6'>
                      {`${tempCarouselImages.filter((image, _) => image.question === question)?.[0]?.imageName ?? ''}`}
                    </span>
                  )}
                </div>

                {/* <div className='block absolute top-1/2 translate-y-[-50%] right-8 p-1 rounded-md cursor-pointer'>
                  <label htmlFor={`upload-${index}`}>
                    <Plus className='w-3.5 h-3.5 text-gray-500 hover:text-blue-700 cursor-pointer' />
                  </label>
                  <input
                    type='file'
                    id={`upload-${index}`}
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                      handleCarouselImageUpload(e, question)
                    }}
                  ></input>
                </div> */}
                <div className='block absolute top-1/2 translate-y-[-50%] right-8 p-1 rounded-md cursor-pointer'>
                  <>
                    <label htmlFor={`upload-${index}`}>
                      {tempCarouselImages.some((image) => image.question === question) ? (
                        <Edit02 className='w-3.5 h-3.5 text-gray-500 hover:text-blue-700 cursor-pointer' />
                      ) : (
                        <Plus className='w-3.5 h-3.5 text-gray-500 hover:text-blue-700 cursor-pointer' />
                      )}
                    </label>
                    <input
                      type='file'
                      id={`upload-${index}`}
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => {
                        handleCarouselImageUpload(e, question)
                      }}
                    ></input>
                  </>

                </div>
              </div>
            )
          })}</ReactSortable>
        {tempSuggestedQuestions.length < MAX_QUESTION_NUM && (
          <div
            onClick={() => { setTempSuggestedQuestions([...tempSuggestedQuestions, '']) }}
            // className='mt-1 flex items-center h-9 px-3 gap-2 rounded-lg cursor-pointer text-gray-400  bg-gray-100 hover:bg-gray-200'>
            className='mt-1 flex items-center h-9 px-3 gap-2 rounded-lg cursor-pointer text-gray-400 dark:text-white  bg-gray-100 dark:bg-[#3f3f3f] hover:bg-gray-200 dark:hover:bg-zinc-800'>

            <Plus className='w-4 h-4'></Plus>
            <div className='text-gray-500 text-[13px]'>{t('appDebug.variableConig.addOption')}</div>
          </div>
        )}
      </div>
    ) : (
      <div className='mt-1.5 flex flex-wrap'>
        {notEmptyQuestions.map((question, index) => {
          return (
            <div key={index} className='mt-1 mr-1 max-w-full truncate last:mr-0 shrink-0 leading-8 items-center px-2.5 rounded-lg border border-gray-200 shadow-xs bg-white text-[13px] font-normal text-gray-900 cursor-pointer'>
              {question}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Panel
      className={cn(isShowConfirmAddVar && 'h-[220px]', 'relative !bg-gray-25')}
      title={t('appDebug.openingStatement.title')}
      headerIcon={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.33353 1.33301C4.83572 1.33301 2.00019 4.16854 2.00019 7.66634C2.00019 8.37301 2.11619 9.05395 2.3307 9.69036C2.36843 9.80229 2.39063 9.86853 2.40507 9.91738L2.40979 9.93383L2.40729 9.93903C2.39015 9.97437 2.36469 10.0218 2.31705 10.11L1.2158 12.1484C1.14755 12.2746 1.07633 12.4064 1.02735 12.5209C0.978668 12.6348 0.899813 12.8437 0.938613 13.0914C0.984094 13.3817 1.15495 13.6373 1.40581 13.7903C1.61981 13.9208 1.843 13.9279 1.96683 13.9264C2.09141 13.925 2.24036 13.9095 2.38314 13.8947L5.81978 13.5395C5.87482 13.5338 5.9036 13.5309 5.92468 13.5292L5.92739 13.529L5.93564 13.532C5.96154 13.5413 5.99666 13.5548 6.0573 13.5781C6.76459 13.8506 7.53244 13.9997 8.33353 13.9997C11.8313 13.9997 14.6669 11.1641 14.6669 7.66634C14.6669 4.16854 11.8313 1.33301 8.33353 1.33301ZM5.9799 5.72116C6.73142 5.08698 7.73164 5.27327 8.33144 5.96584C8.93125 5.27327 9.91854 5.09365 10.683 5.72116C11.4474 6.34867 11.5403 7.41567 10.9501 8.16572C10.5845 8.6304 9.6668 9.47911 9.02142 10.0576C8.78435 10.2702 8.66582 10.3764 8.52357 10.4192C8.40154 10.456 8.26134 10.456 8.13931 10.4192C7.99706 10.3764 7.87853 10.2702 7.64147 10.0576C6.99609 9.47911 6.07839 8.6304 5.71276 8.16572C5.12259 7.41567 5.22839 6.35534 5.9799 5.72116Z" fill="#E74694" />
        </svg>
      }
      headerRight={headerRight}
      hasHeaderBottomBorder={!hasValue}
      isFocus={isFocus}
    >
      {/* <div className='text-gray-700 text-sm'> */}
      <div className='text-gray-700 dark:text-[#FCFCFC] text-sm'>

        {(hasValue || (!hasValue && isFocus)) ? (
          <>
            {isFocus
              ? (
                <div>
                  <textarea
                    ref={inputRef}
                    value={tempValue}
                    rows={3}
                    onChange={e => setTempValue(e.target.value)}
                    className="w-full px-0 text-sm  border-0 bg-transparent focus:outline-none "
                    placeholder={t('appDebug.openingStatement.placeholder') as string}
                  >
                  </textarea>
                </div>
              )
              : (
                <div dangerouslySetInnerHTML={{
                  __html: coloredContent,
                }}></div>
              )}
            {renderQuestions()}
          </>) : (
          <div className='pt-2 pb-1 text-xs text-gray-500'>{t('appDebug.openingStatement.noDataPlaceHolder')}</div>
        )}

        {isShowConfirmAddVar && (
          <ConfirmAddVar
            varNameArr={notIncludeKeys}
            onConfrim={autoAddVar}
            onCancel={cancelAutoAddVar}
            onHide={hideConfirmAddVar}
          />
        )}

      </div>
    </Panel>
  )
}
export default React.memo(OpeningStatement)
