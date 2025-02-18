import type {
  FC,
  ReactNode,
} from 'react'
import { memo, useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import type {
  ChatConfig,
  ChatItem,
} from '../../types'
import Operation from './operation'
import AgentContent from './agent-content'
import BasicContent from './basic-content'
import SuggestedQuestions from './suggested-questions'
import More from './more'
// import WorkflowProcess from './workflow-process'
import { AnswerTriangle } from '@/app/components/base/icons/src/vender/solid/general'
import { MessageFast } from '@/app/components/base/icons/src/vender/solid/communication'
import LoadingAnim from '@/app/components/app/chat/loading-anim'
import Citation from '@/app/components/app/chat/citation'
import { EditTitle } from '@/app/components/app/annotation/edit-annotation-modal/edit-item'
import type { Emoji } from '@/app/components/tools/types'

type AnswerProps = {
  item: ChatItem
  question: string
  index: number
  config?: ChatConfig
  answerIcon?: ReactNode
  responding?: boolean
  allToolIcons?: Record<string, string | Emoji>
  showPromptLog?: boolean
  chatAnswerContainerInner?: string
  hideProcessDetail?: boolean
}
const Answer: FC<AnswerProps> = ({
  item,
  question,
  index,
  config,
  answerIcon,
  responding,
  allToolIcons,
  showPromptLog,
  chatAnswerContainerInner,
  hideProcessDetail,
}) => {
  // const { t } = useTranslation()
  const {
    content,
    citation,
    agent_thoughts,
    more,
    annotation,
    workflowProcess,
  } = item
  const hasAgentThoughts = !!agent_thoughts?.length

  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const getContainerWidth = () => {
    if (containerRef.current)
      setContainerWidth(containerRef.current?.clientWidth + 16)
  }
  const getContentWidth = () => {
    if (contentRef.current)
      setContentWidth(contentRef.current?.clientWidth)
  }

  useEffect(() => {
    getContainerWidth()
  }, [])

  useEffect(() => {
    if (!responding)
      getContentWidth()
  }, [responding])

  return (
    <div className='flex mb-2 last:mb-0'>
      <div className='shrink-0 relative w-10 h-10'>
        {
          answerIcon || (
            // <div className='flex items-center justify-center w-full h-full rounded-full bg-[#d5f5f6] border-[0.5px] border-black/5 text-xl'>
            // <div className='flex items-center justify-center relative overflow-hidden w-full h-full rounded-full bg-[#5D6A6F] text-xl'>
            <div className='flex items-center justify-center relative overflow-hidden w-full h-full rounded-full bg-[#C8E441] text-xl'>
              {/* 🤖 */}
              <img src='/logo/sify-logo-small.png' alt='logo' className='w-10/12 h-6/12 absolute object-cover' />
              {/* <img src='/logo/sify-logo-small.png' alt='logo' className='w-10/12 h-6/12 absolute object-fill' /> */}
              {/* <img src='/logo/chat-logo.png' alt='logo' className='w-full h-full absolute object-fill' /> */}
            </div>
          )
        }
        {
          // responding && (
          //   <div className='absolute -top-[3px] -left-[3px] pl-[6px] flex items-center w-4 h-4 bg-white rounded-full shadow-xs border-[0.5px] border-gray-50'>
          //     <LoadingAnim type='avatar' />
          //   </div>
          // )
        }
      </div>
      <div className='chat-answer-container group grow w-0 ml-4' ref={containerRef}>
        <div className={`group relative pr-10 ${chatAnswerContainerInner}`}>
          {/* <AnswerTriangle className='absolute -left-2 top-0 w-2 h-3 text-gray-100' /> */}
          <div
            ref={contentRef}
            className={`
              relative inline-block px-4 py-3 max-w-full bg-gray-100 rounded-b-2xl rounded-tr-2xl text-sm text-gray-900
              ${workflowProcess && 'w-full'}
            `}
          // className={`
          //   relative inline-block px-4 py-3 max-w-xl bg-[#f1f1f1] dark:bg-[#3f3f3f] rounded-b-3xl rounded-tr-3xl rounded-tl-md text-sm text-gray-900
          //   ${workflowProcess && 'w-full'}
          // `}
          >
            {annotation?.id && (
              <div
                className='absolute -top-3.5 -right-3.5 box-border flex items-center justify-center h-7 w-7 p-0.5 rounded-lg bg-white cursor-pointer text-[#8AB40A] shadow-md group-hover:hidden'
              >
                <div className='p-1 rounded-lg bg-[#EEF4FF] '>
                  <MessageFast className='w-4 h-4' />
                </div>
              </div>
            )}
            {
              !responding && (
                <Operation
                  hasWorkflowProcess={!!workflowProcess}
                  maxSize={containerWidth - contentWidth - 4}
                  contentWidth={contentWidth}
                  item={item}
                  question={question}
                  index={index}
                  showPromptLog={showPromptLog}
                />
              )
            }
            {
              // workflowProcess && (
              //   <WorkflowProcess
              //     data={workflowProcess}
              //     item={item}
              //     hideInfo
              //     hideProcessDetail={hideProcessDetail}
              //   />
              // )
            }
            {
              responding && !content && !hasAgentThoughts && (
                <div className='flex items-center justify-center w-6 h-5'>
                  <LoadingAnim type='text' />
                </div>
              )
            }
            {
              content && !hasAgentThoughts && (
                <BasicContent item={item} />
              )
            }
            {
              hasAgentThoughts && (
                <AgentContent
                  item={item}
                  responding={responding}
                  allToolIcons={allToolIcons}
                />
              )
            }
            {
              annotation?.id && annotation.authorName && (
                <EditTitle
                  className='mt-1'
                  title={`Answer edited by ${annotation.authorName}`}
                />
              )
            }
            <SuggestedQuestions item={item} />
            {
              !!citation?.length && !responding && (
                <Citation data={citation} showHitInfo={config?.supportCitationHitInfo} />
              )
            }
          </div>
        </div>
        <More more={more} />
      </div>
    </div>
  )
}

export default memo(Answer)
