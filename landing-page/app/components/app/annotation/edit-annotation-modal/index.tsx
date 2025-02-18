'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import EditItem, { EditItemType } from './edit-item'
import Drawer from '@/app/components/base/drawer-plus'
import { MessageCheckRemove } from '@/app/components/base/icons/src/vender/line/communication'
import DeleteConfirmModal from '@/app/components/base/modal/delete-confirm-modal'
import { addAnnotation, editAnnotation } from '@/service/annotation'
import Toast from '@/app/components/base/toast'
import { useProviderContext } from '@/context/provider-context'
// import AnnotationFull from '@/app/components/billing/annotation-full'
import useTimestamp from '@/hooks/use-timestamp'

type Props = {
  isShow: boolean
  onHide: () => void
  appId: string
  messageId?: string
  annotationId?: string
  query: string
  answer: string
  onEdited: (editedQuery: string, editedAnswer: string) => void
  onAdded: (annotationId: string, authorName: string, editedQuery: string, editedAnswer: string) => void
  createdAt?: number
  onRemove: () => void
  onlyEditResponse?: boolean
}

const EditAnnotationModal: FC<Props> = ({
  isShow,
  onHide,
  query,
  answer,
  onEdited,
  onAdded,
  appId,
  messageId,
  annotationId,
  createdAt,
  onRemove,
  onlyEditResponse,
}) => {
  // const { t } = useTranslation()
  const { formatTime } = useTimestamp()
  const { plan, enableBilling } = useProviderContext()
  const isAdd = !annotationId
  const isAnnotationFull = (enableBilling && plan.usage.annotatedResponse >= plan.total.annotatedResponse)
  const handleSave = async (type: EditItemType, editedContent: string) => {
    let postQuery = query
    let postAnswer = answer
    if (type === EditItemType.Query)
      postQuery = editedContent
    else
      postAnswer = editedContent
    if (!isAdd) {
      await editAnnotation(appId, annotationId, {
        message_id: messageId,
        question: postQuery,
        answer: postAnswer,
      })
      onEdited(postQuery, postAnswer)
    }
    else {
      const res: any = await addAnnotation(appId, {
        question: postQuery,
        answer: postAnswer,
        message_id: messageId,
      })
      onAdded(res.id, res.account?.name, postQuery, postAnswer)
    }

    Toast.notify({
      message: 'Action succeeded',
      type: 'success',
    })
  }
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Drawer
        isShow={isShow}
        onHide={onHide}
        maxWidthClassName='!max-w-[480px]'
        title={'Edit Annotation Reply'}
        body={(
          <div className='p-6 pb-4 space-y-6'>
            <EditItem
              type={EditItemType.Query}
              content={query}
              readonly={(isAdd && isAnnotationFull) || onlyEditResponse}
              onSave={editedContent => handleSave(EditItemType.Query, editedContent)}
            />
            <EditItem
              type={EditItemType.Answer}
              content={answer}
              readonly={isAdd && isAnnotationFull}
              onSave={editedContent => handleSave(EditItemType.Answer, editedContent)}
            />
          </div>
        )}
        foot={
          <div>
            {/* {isAnnotationFull && (
              <div className='mt-6 mb-4 px-6'>
                <AnnotationFull />
              </div>
            )} */}

            {
              annotationId
                ? (
                  <div className='px-4 flex h-16 items-center justify-between border-t border-black/5 bg-gray-50 rounded-bl-xl rounded-br-xl leading-[18px] text-[13px] font-medium text-gray-500'>
                    <div
                      className='flex items-center pl-3 space-x-2 cursor-pointer'
                      onClick={() => setShowModal(true)}
                    >
                      <MessageCheckRemove />
                      <div>Remove this Annotation</div>
                    </div>
                    {createdAt && <div>Created At&nbsp;{formatTime(createdAt, 'MM/DD/YYYY hh:mm A' as string)}</div>}
                  </div>
                )
                : undefined
            }
          </div>
        }
      />
      <DeleteConfirmModal
        isShow={showModal}
        onHide={() => setShowModal(false)}
        onRemove={() => {
          onRemove()
          setShowModal(false)
          onHide()
        }}
        text={'Delete this annotation ?'}
      />
    </div>

  )
}
export default React.memo(EditAnnotationModal)
