import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import { useContext } from 'use-context-selector'
import { useTranslation } from 'react-i18next'
import { useUnmount } from 'ahooks'
import cn from 'classnames'
import { useStore as useTagStore } from './store'
import type { HtmlContentProps } from '@/app/components/base/popover'
import CustomPopover from '@/app/components/base/popover'
import Divider from '@/app/components/base/divider'
import SearchInput from '@/app/components/base/search-input'
import { Tag01, Tag03 } from '@/app/components/base/icons/src/vender/line/financeAndECommerce'
import { Plus } from '@/app/components/base/icons/src/vender/line/general'
import type { Tag } from '@/app/components/base/tag-management/constant'
import Checkbox from '@/app/components/base/checkbox'
import { bindTag, createTag, fetchTagList, unBindTag } from '@/service/tag'
import { ToastContext } from '@/app/components/base/toast'
import { getDarkThemeClasses } from '@/app/theme'
 
type TagSelectorProps = {
  targetID: string
  isPopover?: boolean
  position?: 'bl' | 'br'
  type: 'knowledge' | 'app'
  value: string[]
  selectedTags: Tag[]
  onCacheUpdate: (tags: Tag[]) => void
  onChange?: () => void
}
 
type PanelProps = {
  onCreate: () => void
} & HtmlContentProps & TagSelectorProps
 
const Panel = (props: PanelProps) => {
  const { t } = useTranslation()
  const { notify } = useContext(ToastContext)
  const { targetID, type, value, selectedTags, onCacheUpdate, onChange, onCreate } = props
  const tagList = useTagStore(s => s.tagList)
  const setTagList = useTagStore(s => s.setTagList)
  const setShowTagManagementModal = useTagStore(s => s.setShowTagManagementModal)
  const [selectedTagIDs, setSelectedTagIDs] = useState<string[]>(value)
  const [keywords, setKeywords] = useState('')
 
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
  }
 
  const notExisted = useMemo(() => {
    return tagList.every(tag => tag.type === type && tag.name !== keywords)
  }, [type, tagList, keywords])
  const filteredSelectedTagList = useMemo(() => {
    return selectedTags.filter(tag => tag.name.includes(keywords))
  }, [keywords, selectedTags])
  const filteredTagList = useMemo(() => {
    return tagList.filter(tag => tag.type === type && !value.includes(tag.id) && tag.name.includes(keywords))
  }, [type, tagList, value, keywords])
 
  const [creating, setCreating] = useState<Boolean>(false)
  const createNewTag = async () => {
    if (!keywords)
      return
    if (creating)
      return
    try {
      setCreating(true)
      const newTag = await createTag(keywords, type)
      notify({ type: 'success', message: t('common.tag.created') })
      setTagList([
        ...tagList,
        newTag,
      ])
      setCreating(false)
      onCreate()
    }
    catch (e: any) {
      notify({ type: 'error', message: t('common.tag.failed') })
      setCreating(false)
    }
  }
  const bind = async (tagIDs: string[]) => {
    try {
      await bindTag(tagIDs, targetID, type)
      notify({ type: 'success', message: t('common.actionMsg.modifiedSuccessfully') })
    }
    catch (e: any) {
      notify({ type: 'error', message: t('common.actionMsg.modifiedUnsuccessfully') })
    }
  }
  const unbind = async (tagID: string) => {
    try {
      await unBindTag(tagID, targetID, type)
      notify({ type: 'success', message: t('common.actionMsg.modifiedSuccessfully') })
    }
    catch (e: any) {
      notify({ type: 'error', message: t('common.actionMsg.modifiedUnsuccessfully') })
    }
  }
  const selectTag = (tag: Tag) => {
    if (selectedTagIDs.includes(tag.id))
      setSelectedTagIDs(selectedTagIDs.filter(v => v !== tag.id))
    else
      setSelectedTagIDs([...selectedTagIDs, tag.id])
  }
 
  const valueNotChanged = useMemo(() => {
    return value.length === selectedTagIDs.length && value.every(v => selectedTagIDs.includes(v)) && selectedTagIDs.every(v => value.includes(v))
  }, [value, selectedTagIDs])
  const handleValueChange = () => {
    const addTagIDs = selectedTagIDs.filter(v => !value.includes(v))
    const removeTagIDs = value.filter(v => !selectedTagIDs.includes(v))
    const selectedTags = tagList.filter(tag => selectedTagIDs.includes(tag.id))
    onCacheUpdate(selectedTags)
    Promise.all([
      ...(addTagIDs.length ? [bind(addTagIDs)] : []),
      ...[removeTagIDs.length ? removeTagIDs.map(tagID => unbind(tagID)) : []],
    ]).finally(() => {
      if (onChange)
        onChange()
    })
  }
  useUnmount(() => {
    if (valueNotChanged)
      return
    handleValueChange()
  })
 
  const onMouseLeave = async () => {
    props.onClose?.()
  }
  return (
 
    // <div className='max-w-screen-xl w-fit bg-white border border-gray-200 rounded-lg absolute left-0' onMouseLeave={onMouseLeave}>
    // {/* <div className='relative w-full max-w-screen-xl bg-white rounded-lg border-[0.5px] border-gray-200' onMouseLeave={onMouseLeave}> */}
    // <div className='p-2 border-b-[0.5px] border-black/5 w-full'>
    //   <SearchInput placeholder={t('common.tag.selectorPlaceholder') || ''} white value={keywords} onChange={handleKeywordsChange} />
    // </div>
 
    // {keywords && notExisted && (
    //   <div className='p-1'>
    //     <div className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100' onClick={createNewTag}>
    //       <Plus className='h-4 w-4 text-gray-500' />
    //       <div className='grow text-sm text-gray-700 leading-5 truncate'>
    //         {`${t('common.tag.create')} `}
    //         <span className='font-medium'>{`"${keywords}"`}</span>
    //       </div>
    //     </div>
    //   </div>
    // )}
    // {keywords && notExisted && filteredTagList.length > 0 && (
    //   <Divider className='!h-[1px] !my-0' />
    // )}
    // {(filteredTagList.length > 0 || filteredSelectedTagList.length > 0) && (
    //   <div className='p-1 max-h-[172px] overflow-y-auto'>
    //     {filteredSelectedTagList.map(tag => (
    //       <div
    //         key={tag.id}
    //         className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100'
    //         onClick={() => selectTag(tag)}
    //       >
    //         <Checkbox
    //           className='shrink-0'
    //           checked={selectedTagIDs.includes(tag.id)}
    //           onCheck={() => { }}
    //         />
    //         <div title={tag.name} className='grow text-sm text-gray-700 leading-5 truncate'>{tag.name}</div>
    //       </div>
    //     ))}
    //     {filteredTagList.map(tag => (
    //       <div
    //         key={tag.id}
    //         className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100'
    //         onClick={() => selectTag(tag)}
    //       >
    //         <Checkbox
    //           className='shrink-0'
    //           checked={selectedTagIDs.includes(tag.id)}
    //           onCheck={() => { }}
    //         />
    //         <div title={tag.name} className='grow text-sm text-gray-700 leading-5 truncate'>{tag.name}</div>
    //       </div>
    //     ))}
    //   </div>
 
    // <div className='absolute max-w-screen-xl w-fit bg-white border border-gray-200 rounded-lg shadow-lg absolute left-0 top-[-200%] transform translate-y-[-10px] z-5 overflow-hidden' onMouseLeave={onMouseLeave}>
    <div className={`absolute max-w-screen-xl w-fit bg-white ${getDarkThemeClasses('main_background')} border border-gray-200 ${getDarkThemeClasses('border')} rounded-lg shadow-lg absolute left-0 top-[-200%] transform translate-y-[-10px] z-5 overflow-hidden`} onMouseLeave={onMouseLeave}>
      <div className='p-2 border-b-[0.5px] border-black/5 w-full'>
        <SearchInput placeholder={t('common.tag.selectorPlaceholder') || ''} white value={keywords} onChange={handleKeywordsChange} />
      </div>
 
      {keywords && notExisted && (
        <div className='p-1'>
          {/* <div className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100' onClick={createNewTag}>
            <Plus className='h-4 w-4 text-gray-500 ' /> */}
             <div className={`flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')}`} onClick={createNewTag}>
             <Plus className={`h-4 w-4 text-gray-500 ${getDarkThemeClasses('svg')}`} />
            <div className='grow text-sm text-gray-700 leading-5 truncate'>
              {`${t('common.tag.create')} `}
              <span className='font-medium'>{`"${keywords}"`}</span>
            </div>
          </div>
        </div>
      )}
      {keywords && notExisted && filteredTagList.length > 0 && (
        <Divider className='!h-[1px] !my-0' />
      )}
      {(filteredTagList.length > 0 || filteredSelectedTagList.length > 0) && (
        // <div className='p-1 max-h-[172px] overflow-y-auto'>
        <div className='p-1 max-h-[172px] overflow-y-auto' onClick={handleClick}>
          {filteredSelectedTagList.map(tag => (
            <div
              key={tag.id}
              className={`flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')}`}
              onClick={() => selectTag(tag)}
            >
              <Checkbox
                className='shrink-0'
                checked={selectedTagIDs.includes(tag.id)}
                onCheck={() => { }}
              />
              {/* <div title={tag.name} className='grow text-sm text-gray-700 leading-5 truncate'>{tag.name}</div> */}
              <div title={tag.name} className={`grow text-sm text-gray-700 ${getDarkThemeClasses('sub_text1')} leading-5 truncate`}>{tag.name}</div>
            </div>
          ))}
          {filteredTagList.map(tag => (
            <div
              key={tag.id}
              // className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100'
              className={`flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')}`}
              onClick={() => selectTag(tag)}
            >
              <Checkbox
                className='shrink-0'
                checked={selectedTagIDs.includes(tag.id)}
                onCheck={() => { }}
              />
              {/* <div title={tag.name} className='grow text-sm text-gray-700 leading-5 truncate'>{tag.name}</div> */}
              <div title={tag.name} className={`grow text-sm text-gray-700 ${getDarkThemeClasses('sub_text1')} leading-5 truncate`}>{tag.name}</div>
            </div>
          ))}
        </div>
      )}
      {!keywords && !filteredTagList.length && !filteredSelectedTagList.length && (
        <div className='p-1'>
          <div className='p-3 flex flex-col items-center gap-1 w-full'>
            <Tag03 className='h-6 w-6 text-gray-300' />
            <div className='text-gray-500 text-xs leading-[14px]'>
              No Labels
            </div>
          </div>
        </div>
      )}
      <Divider className='!h-[1px] !my-0' />
      {/* <div className='p-1'> */}
      <div className='p-1' onClick={handleClick}>
        {/* <div className='flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100' onClick={() => setShowTagManagementModal(true)}> */}
        <div className={`flex items-center gap-2 pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')} `} onClick={() => setShowTagManagementModal(true)}>
 
          {/* <Tag03 className='h-4 w-4 text-gray-500' /> */}
          {/* <Tag03 className='h-4 w-4 text-gray-500 dark:text-white' /> */}
          <Tag03 className={`h-4 w-4 text-gray-500 ${getDarkThemeClasses('text')}`}/>
          {/* <div className='text-sm text-gray-700 dark:text-white leading-5 w-full max-w-[calc(100%_-_40px)]'> */}
          <div className={`text-sm text-gray-700 ${getDarkThemeClasses('text')} leading-5 w-full max-w-[calc(100%_-_40px)]`} >
            {t('common.tag.manageTags')}
          </div>
        </div>
      </div>
    </div>
  )
}
 
const TagSelector: FC<TagSelectorProps> = ({
  targetID,
  isPopover = true,
  position,
  type,
  value,
  selectedTags,
  onCacheUpdate,
  onChange,
}) => {
  const { t } = useTranslation()
 
  const setTagList = useTagStore(s => s.setTagList)
 
  const getTagList = async () => {
    const res = await fetchTagList(type)
    setTagList(res)
  }
 
  const triggerContent = useMemo(() => {
    if (selectedTags?.length)
      return selectedTags.map(tag => tag.name).join(', ')
    return ''
  }, [selectedTags])
  const add_label = "Add Labels"
  const Trigger = () => {
    return (
      // <div className={cn(
      //   // 'group/tip relative w-full flex items-center gap-1 px-2 py-[7px] rounded-md cursor-pointer hover:bg-gray-100' ,
      //   'group/tip relative w-full flex items-center gap-1 px-2 py-[7px] rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white' ,
      // )}>
      <div className={cn(
        // 'group/tip relative w-full flex items-center gap-1 px-2 py-[7px] rounded-md cursor-pointer hover:bg-gray-100' ,
        `group/tip relative w-full flex items-center gap-1 px-2 py-[7px] rounded-md cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')} ${getDarkThemeClasses('text')}` ,
      )}>
        <Tag01 className='shrink-0 w-3 h-3' />
        <div className='grow text-xs text-start leading-[18px] font-normal truncate'>
          {/* {!triggerContent ? t('common.tag.addTag') : triggerContent} */}
          {!triggerContent ? add_label : triggerContent}
 
        </div>
      </div>
    )
  }
  return (
    <>
      {isPopover && (
        <CustomPopover
          htmlContent={
            <Panel
              type={type}
              targetID={targetID}
              value={value}
              selectedTags={selectedTags}
              onCacheUpdate={onCacheUpdate}
              onChange={onChange}
              onCreate={getTagList}
            />
          }
          position={position}
          trigger="click"
          btnElement={<Trigger />}
          btnClassName={open =>
            cn(
              open ? '!bg-gray-100 !text-gray-700' : '!bg-transparent',
              '!w-full !p-0 !border-0 !text-gray-500 hover:!bg-gray-100 hover:!text-gray-700',
            )
          }
          popupClassName='!w-full !ring-0'
          className={'!w-full h-fit !z-20'}
        />
      )}
    </>
 
  )
}
 
export default TagSelector
 
