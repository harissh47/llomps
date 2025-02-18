'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import Textarea from 'rc-textarea'
import cn from 'classnames'
import { Robot, User } from '@/app/components/base/icons/src/public/avatar'
import { Edit04, Trash03 } from '@/app/components/base/icons/src/vender/line/general'
import { Edit04 as EditSolid } from '@/app/components/base/icons/src/vender/solid/general'
import Button from '@/app/components/base/button'

export enum EditItemType {
  Query = 'query',
  Answer = 'answer',
}
type Props = {
  type: EditItemType
  content: string
  readonly?: boolean
  onSave: (content: string) => void
}

export const EditTitle: FC<{ className?: string; title: string }> = ({ className, title }) => (
  <div className={cn(className, 'flex items-center height-[18px] text-xs font-medium text-gray-500')}>
    <EditSolid className='mr-1 w-3.5 h-3.5' />
    <div>{title}</div>
    <div
      className='ml-2 grow h-[1px]'
      style={{
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.05) -1.65%, rgba(0, 0, 0, 0.00) 100%)',
      }}
    ></div>
  </div>
)
const EditItem: FC<Props> = ({
  type,
  readonly,
  content,
  onSave,
}) => {
  // const { t } = useTranslation()
  const [newContent, setNewContent] = useState('')
  const showNewContent = newContent && newContent !== content
  const avatar = type === EditItemType.Query ? <User className='w-6 h-6' /> : <Robot className='w-6 h-6' />
  const name = type === EditItemType.Query ? 'User Query' : 'Storyteller Bot'
  const editTitle = type === EditItemType.Query ? 'Your Query' : 'Your Answer'
  const placeholder = type === EditItemType.Query ? 'Type your query here' : 'Type your answer here'
  const [isEdit, setIsEdit] = useState(false)

  const handleSave = () => {
    onSave(newContent)
    setIsEdit(false)
  }

  const handleCancel = () => {
    setNewContent('')
    setIsEdit(false)
  }

  return (
    <div className='flex' onClick={e => e.stopPropagation()}>
      <div className='shrink-0 mr-3'>
        {avatar}
      </div>
      <div className='grow'>
        <div className='mb-1 leading-[18px] text-xs font-semibold text-gray-900'>{name}</div>
        <div className='leading-5 text-sm font-normal text-gray-900'>{content}</div>
        {!isEdit
          ? (
            <div>
              {showNewContent && (
                <div className='mt-3'>
                  <EditTitle title={editTitle} />
                  <div className='mt-1 leading-5 text-sm font-normal text-gray-900'>{newContent}</div>
                </div>
              )}
              <div className='mt-2 flex items-center'>
                {!readonly && (
                  <div
                    // className='flex items-center space-x-1 leading-[18px] text-xs font-medium text-[#155EEF]
                    className='flex items-center space-x-1 leading-[18px] text-xs font-medium text-[#8AB40A] cursor-pointer'
                    onClick={(e) => {
                      setIsEdit(true)
                    }}
                  >
                    <Edit04 className='mr-1 w-3.5 h-3.5' />
                    <div>Edit</div>
                  </div>
                )}

                {showNewContent && (
                  <div className='ml-2 flex items-center leading-[18px] text-xs font-medium text-gray-500'>
                    <div className='mr-2'>·</div>
                    <div
                      className='flex items-center space-x-1 cursor-pointer'
                      onClick={() => {
                        setNewContent(content)
                        onSave(content)
                      }}
                    >
                      <div className='w-3.5 h-3.5'>
                        <Trash03 className='w-3.5 h-3.5' />
                      </div>
                      <div>Delete</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
          : (
            <div className='mt-3'>
              <EditTitle title={editTitle} />
              <Textarea
                className='mt-1 block w-full leading-5 max-h-none text-sm text-gray-700 outline-none appearance-none resize-none'
                value={newContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent(e.target.value)}
                autoSize={{ minRows: 3 }}
                placeholder={placeholder}
                autoFocus
              />
              <div className='mt-2 flex space-x-2'>
                <Button className='!h-7 !text-xs !font-medium' type='primary' onClick={handleSave}>Save</Button>
                <Button className='!h-7 !text-xs !font-medium' onClick={handleCancel}>Cancel</Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
export default React.memo(EditItem)
