import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import { useDebounceFn, useMount } from 'ahooks'
import cn from 'classnames'
import { useStore as useLabelStore } from './store'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import SearchInput from '@/app/components/base/search-input'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { Tag01, Tag03 } from '@/app/components/base/icons/src/vender/line/financeAndECommerce'
import { Check } from '@/app/components/base/icons/src/vender/line/general'
import { XCircle } from '@/app/components/base/icons/src/vender/solid/general'
import type { Label } from '@/app/components/tools/labels/constant'
import { fetchLabelList } from '@/service/tools'
import I18n from '@/context/i18n'
import { getLanguage } from '@/i18n/language'
<<<<<<< HEAD

=======
import { getDarkThemeClasses } from '@/app/theme'
>>>>>>> origin/rupa
type LabelFilterProps = {
  value: string[]
  onChange: (v: string[]) => void
}
const LabelFilter: FC<LabelFilterProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation()
  const { locale } = useContext(I18n)
  const language = getLanguage(locale)
  const [open, setOpen] = useState(false)

  const labelList = useLabelStore(s => s.labelList)
  const setLabelList = useLabelStore(s => s.setLabelList)

  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')
  const { run: handleSearch } = useDebounceFn(() => {
    setSearchKeywords(keywords)
  }, { wait: 500 })
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }

  const filteredLabelList = useMemo(() => {
    return labelList.filter(label => label.name.includes(searchKeywords))
  }, [labelList, searchKeywords])

  const currentLabel = useMemo(() => {
    return labelList.find(label => label.name === value[0])
  }, [value, labelList])

  const selectLabel = (label: Label) => {
    if (value.includes(label.name))
      onChange(value.filter(v => v !== label.name))
    else
      onChange([...value, label.name])
  }

  useMount(() => {
    fetchLabelList().then((res) => {
      setLabelList(res)
    })
  })

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='bottom-start'
      offset={4}
    >
      <div className='relative'>
        <PortalToFollowElemTrigger
          onClick={() => setOpen(v => !v)}
          className='block'
        >
          <div className={cn(
            // 'flex items-center gap-1 px-2 h-8 rounded-lg border-[0.5px] border-transparent bg-gray-200 cursor-pointer hover:bg-gray-300',
<<<<<<< HEAD
            'flex items-center gap-1 px-2 h-8 rounded-lg border-[0.5px] border-transparent bg-gray-200 dark:bg-[#3f3f3f] cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-800',
            // open && !value.length && '!bg-gray-300 hover:bg-gray-300 ',
            open && !value.length && '!bg-gray-300 dark:!bg-[#3f3f3f] hover:bg-gray-300 dark:hover:bg-zinc-800',
            // !open && !!value.length && '!bg-white/80  shadow-xs !border-black/5 hover:!bg-gray-200',
            !open && !!value.length && '!bg-white/80 dark:!bg-[#3f3f3f]/80  shadow-xs !border-black/5 hover:!bg-gray-200 dark:hover:!bg-zinc-800',
            // open && !!value.length && '!bg-gray-200 !border-black/5 shadow-xs hover:!bg-gray-200',
            open && !!value.length && '!bg-gray-200 dark:!bg-[#3f3f3f] !border-black/5 shadow-xs hover:!bg-gray-200 dark:hover:!bg-zinc-800',
=======
            `flex items-center gap-1 px-2 h-8 rounded-lg border-[0.5px] border-transparent bg-gray-200 ${getDarkThemeClasses('background3')} cursor-pointer hover:bg-gray-300 ${getDarkThemeClasses('hover')}`,
            // open && !value.length && '!bg-gray-300 hover:bg-gray-300 ',
            open && !value.length && `!bg-gray-300 ${getDarkThemeClasses('background3')} hover:bg-gray-300 ${getDarkThemeClasses('hover')}
`,
            // !open && !!value.length && '!bg-white/80  shadow-xs !border-black/5 hover:!bg-gray-200',
            !open && !!value.length && `!bg-white/80  ${getDarkThemeClasses('background3')}/80  shadow-xs !border-black/5 hover:!bg-gray-200 ${getDarkThemeClasses('hover')}`,
            // open && !!value.length && '!bg-gray-200 !border-black/5 shadow-xs hover:!bg-gray-200',
            open && !!value.length && `!bg-gray-200  ${getDarkThemeClasses('background3')} !border-black/5 shadow-xs hover:!bg-gray-200 ${getDarkThemeClasses('hover')}
`,
>>>>>>> origin/rupa

          )}>
            <div className='p-[1px]'>
              <Tag01 className='h-3.5 w-3.5 text-gray-700' />
            </div>
            {/* <div className='text-[13px] leading-[18px] text-gray-700'> */}
<<<<<<< HEAD
            <div className='text-[13px] leading-[18px] text-gray-700 dark:text-white'>
=======
            <div className={`text-[13px] leading-[18px] text-gray-700 ${getDarkThemeClasses('text')}
`}>
>>>>>>> origin/rupa

              {!value.length && t('common.tag.placeholder')}
              {!!value.length && currentLabel?.label[language]}
            </div>
            {value.length > 1 && (
              // <div className='text-xs font-medium leading-[18px] text-gray-500'>{`+${value.length - 1}`}</div>
<<<<<<< HEAD
              <div className='text-xs font-medium leading-[18px] text-gray-500 dark:text-white'>{`+${value.length - 1}`}</div>
=======
              <div className={`text-xs font-medium leading-[18px] text-gray-500 ${getDarkThemeClasses('text')}`}>{`+${value.length - 1}`}</div>
>>>>>>> origin/rupa

            )}
            {!value.length && (
              <div className='p-[1px]'>
                {/* <ChevronDown className='h-3.5 w-3.5 text-gray-700'/> */}
<<<<<<< HEAD
                <ChevronDown className='h-3.5 w-3.5 text-gray-700 dark:text-white'/>
=======
                <ChevronDown className={`h-3.5 w-3.5 text-gray-700 ${getDarkThemeClasses('text')}`}/>
>>>>>>> origin/rupa

              </div>
            )}
            {!!value.length && (
              <div className='p-[1px] cursor-pointer group/clear' onClick={(e) => {
                e.stopPropagation()
                onChange([])
              }}>
                <XCircle className='h-3.5 w-3.5 text-gray-400 group-hover/clear:text-gray-600'/>
              </div>
            )}
          </div>
        </PortalToFollowElemTrigger>
        <PortalToFollowElemContent className='z-[1002]'>
          {/* <div className='relative w-[240px] bg-white rounded-lg border-[0.5px] border-gray-200  shadow-lg'> */}
<<<<<<< HEAD
          {/* <div className='relative w-[240px] bg-white ${getDarkThemeClasses('background')} rounded-lg border-[0.5px] border-gray-200 dark:border-[#5f5f5f]  shadow-lg'> */}
          <div className='relative w-[240px] bg-white dark:bg-[#333333] rounded-lg border-[0.5px] border-gray-200 dark:border-[#5F5F5F] shadow-lg dark:overflow-hidden'>
=======
          {/* <div className='relative w-[240px] bg-white dark:bg-[#202020] rounded-lg border-[0.5px] border-gray-200 dark:border-[#5f5f5f]  shadow-lg'> */}
          <div className={`relative w-[240px] bg-white ${getDarkThemeClasses('background1')} rounded-lg border-[0.5px] border-gray-200 ${getDarkThemeClasses('border')} shadow-lg overflow-hidden`}>
>>>>>>> origin/rupa
            <div className='p-2 border-b-[0.5px] border-black/5'>
              <SearchInput white value={keywords} onChange={handleKeywordsChange} />
            </div>
            {/* <div className='p-1'> */}
<<<<<<< HEAD
            <div className='p-1 dark:bg-[#333333] '>
=======
            <div className={`p-1  ${getDarkThemeClasses('background1')}`}>
>>>>>>> origin/rupa
              {filteredLabelList.map(label => (
                <div
                  key={label.name}
                  // className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100'
<<<<<<< HEAD
                  className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800'
                  onClick={() => selectLabel(label)}
                >
                  {/* <div title={label.label[language]} className='grow text-sm text-gray-700 leading-5 truncate'>{label.label[language]}</div> */}
                  <div title={label.label[language]} className='grow text-sm text-gray-700 dark:text-white leading-5 truncate'>{label.label[language]}</div>
=======
                  className={`flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')}`}
                  onClick={() => selectLabel(label)}
                >
                  {/* <div title={label.label[language]} className='grow text-sm text-gray-700 leading-5 truncate'>{label.label[language]}</div> */}
                  <div title={label.label[language]} className={`grow text-sm text-gray-700 ${getDarkThemeClasses('text')} leading-5 truncate`}>{label.label[language]}</div>
>>>>>>> origin/rupa
                  {value.includes(label.name) && <Check className='shrink-0 w-4 h-4 text-primary-600'/>}
                </div>
              ))}
              {!filteredLabelList.length && (
                <div className='p-3 flex flex-col items-center gap-1'>
                  <Tag03 className='h-6 w-6 text-gray-300' />
                  {/* <div className='text-gray-500 text-xs leading-[14px]'>{t('common.tag.noTag')}</div> */}
                  <div className='text-gray-500 text-xs leading-[14px]'>No Labels</div>

                </div>
              )}
            </div>
          </div>
        </PortalToFollowElemContent>
      </div>
    </PortalToFollowElem>

  )
}

export default LabelFilter
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
