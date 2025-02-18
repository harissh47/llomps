'use client'
import useSWR from 'swr'
import produce from 'immer'
import React, { Fragment } from 'react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  useFeatures,
  useFeaturesStore,
} from '../../hooks'
import type { OnFeaturesChange } from '../../types'
import type { Item } from '@/app/components/base/select'
import { fetchAppVoices } from '@/service/apps'
import Tooltip from '@/app/components/base/tooltip'
import { HelpCircle } from '@/app/components/base/icons/src/vender/line/general'
import { languages } from '@/i18n/language'

type VoiceParamConfigProps = {
  onChange?: OnFeaturesChange
}
const VoiceParamConfig = ({
  onChange,
}: VoiceParamConfigProps) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const matched = pathname.match(/\/app\/([^/]+)/)
  const appId = (matched?.length && matched[1]) ? matched[1] : ''
  const text2speech = useFeatures(state => state.features.text2speech)
  const featuresStore = useFeaturesStore()

  const languageItem = languages.find(item => item.value === text2speech.language)
  const localLanguagePlaceholder = languageItem?.name || t('common.placeholder.select')

  const language = languageItem?.value
  const voiceItems = useSWR({ appId, language }, fetchAppVoices).data
  const voiceItem = voiceItems?.find(item => item.value === text2speech.voice)
  const localVoicePlaceholder = voiceItem?.name || t('common.placeholder.select')

  const handleChange = (value: Record<string, string>) => {
    const {
      features,
      setFeatures,
    } = featuresStore!.getState()

    const newFeatures = produce(features, (draft) => {
      draft.text2speech = {
        ...draft.text2speech,
        ...value,
      }
    })

    setFeatures(newFeatures)
    if (onChange)
      onChange(newFeatures)
  }

  return (
    <div>
      <div>
        <div className='leading-6 text-base font-semibold text-gray-800 dark:text-white'>{t('appDebug.voice.voiceSettings.title')}</div>
        <div className='pt-3 space-y-6'>
          <div>
            <div className='mb-2 flex items-center  space-x-1'>
              <div className='leading-[18px] text-[13px] font-semibold text-gray-800 dark:text-white'>{t('appDebug.voice.voiceSettings.language')}</div>
              <Tooltip htmlContent={<div className='w-[180px]' >
                {t('appDebug.voice.voiceSettings.resolutionTooltip').split('\n').map(item => (
                  <div key={item}>{item}</div>
                ))}
              </div>} selector='config-resolution-tooltip'>
                <HelpCircle className='w-[14px] h-[14px] text-gray-400' />
              </Tooltip>
            </div>
            <Listbox
              value={languageItem}
              onChange={(value: Item) => {
                handleChange({
                  language: String(value.value),
                })
              }}
            >
              <div className={'relative h-9'}>
                {/* <Listbox.Button className={'w-full h-full rounded-lg border-0 bg-gray-100 py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6 focus-visible:outline-none focus-visible:bg-gray-200 group-hover:bg-gray-200 cursor-pointer'}> */}
                <Listbox.Button className={'w-full h-full rounded-lg border-0 bg-gray-100 dark:bg-[#3f3f3f] dark:text-white py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6 focus-visible:outline-none focus-visible:bg-gray-200 group-hover:bg-gray-200 cursor-pointer'}>

                  <span className={classNames('block truncate text-left', !languageItem?.name && 'text-gray-400 dark:text-white ')}>
                    {languageItem?.name ? t(`common.voice.language.${languageItem?.value.replace('-', '')}`) : localLanguagePlaceholder}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400 "
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >

                  <Listbox.Options className="absolute z-10 mt-1 px-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#3f3f3f] py-1 text-base shadow-lg border-gray-200 dark:border-[#5f5f5f] border-[0.5px] focus:outline-none sm:text-sm">
                    {languages.map((item: Item) => (
                      <Listbox.Option
                        key={item.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-9 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-[#3f3f3f]' : ''
                          }`
                        }
                        value={item}
                        disabled={false}
                      >
                        {({ /* active, */ selected }) => (
                          <>
                            <span
                              className={classNames('block', selected && 'font-normal')}>{t(`common.voice.language.${(item.value).toString().replace('-', '')}`)}</span>
                            {(selected || item.value === text2speech.language) && (
                              <span
                                className={classNames(
                                  'absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div>
            <div className='mb-2 leading-[18px] text-[13px] font-semibold text-gray-800 dark:text-white'>{t('appDebug.voice.voiceSettings.voice')}</div>
            <Listbox
              value={voiceItem}
              disabled={!languageItem}
              onChange={(value: Item) => {
                handleChange({
                  voice: String(value.value),
                })
              }}
            >
              <div className={'relative h-9'}>
                <Listbox.Button className={'w-full h-full rounded-lg border-0 bg-gray-100 dark:bg-[#3f3f3f] py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6 focus-visible:outline-none focus-visible:bg-gray-200 group-hover:bg-gray-200 dark:group-hover:bg-zinc-800 cursor-pointer'}>
                  <span className={classNames('block truncate text-left', !voiceItem?.name && 'text-gray-400 dark:text-white')}>{voiceItem?.name ?? localVoicePlaceholder}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >

                  <Listbox.Options className="absolute z-10 mt-1 px-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#3f3f3f] py-1 text-base shadow-lg border-gray-200 dark:border-[#5f5f5f] border-[0.5px] focus:outline-none sm:text-sm">
                    {voiceItems?.map((item: Item) => (
                      <Listbox.Option
                        key={item.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-9 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-[#3f3f3f]' : ''
                          }`
                        }
                        value={item}
                        disabled={false}
                      >
                        {({ /* active, */ selected }) => (
                          <>
                            <span className={classNames('block', selected && 'font-normal')}>{item.name}</span>
                            {(selected || item.value === text2speech.voice) && (
                              <span
                                className={classNames(
                                  'absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(VoiceParamConfig)
