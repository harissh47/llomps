import {
  memo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  useEdges,
  useNodes,
} from 'reactflow'
import cn from 'classnames'
import BlockIcon from '../block-icon'
import {
  useChecklist,
  useNodesInteractions,
} from '../hooks'
import type {
  CommonEdgeType,
  CommonNodeType,
} from '../types'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import {
  Checklist,
  ChecklistSquare,
  XClose,
} from '@/app/components/base/icons/src/vender/line/general'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/line/alertsAndFeedback'

type WorkflowChecklistProps = {
  disabled: boolean
}
const WorkflowChecklist = ({
  disabled,
}: WorkflowChecklistProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const nodes = useNodes<CommonNodeType>()
  const edges = useEdges<CommonEdgeType>()
  const needWarningNodes = useChecklist(nodes, edges)
  const { handleNodeSelect } = useNodesInteractions()

  return (
    <PortalToFollowElem
      placement='bottom-end'
      offset={{
        mainAxis: 12,
        crossAxis: 4,
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <PortalToFollowElemTrigger onClick={() => !disabled && setOpen(v => !v)}>
        <div
          className={cn(
            'relative flex items-center justify-center p-0.5 w-8 h-8 rounded-lg border-[0.5px] border-gray-200 dark:border-[#5F5F5F] bg-white dark:bg-[#202020] shadow-xs',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <div
            className={`
              group flex items-center justify-center w-full h-full rounded-md cursor-pointer
              hover:bg-primary-50
              ${open && 'bg-primary-50'}
            `}
          >
            <Checklist
              className={`
                w-4 h-4 group-hover:text-primary-600
                ${open ? 'text-primary-600' : 'text-gray-500'}`
              }
            />
          </div>
          {
            !!needWarningNodes.length && (
              <div className='absolute -right-1.5 -top-1.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full border border-gray-100 text-white text-[11px] font-semibold bg-[#F79009]'>
                {needWarningNodes.length}
              </div>
            )
          }
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className='z-[12]'>
        <div
          // className='w-[420px] rounded-2xl bg-white border-[0.5px] border-black/5 shadow-lg overflow-y-auto'
          className='w-[420px] rounded-2xl bg-white dark:bg-[#333333] border-[0.5px] border-black/5 dark:border-[#5F5F5F]/2 shadow-lg overflow-y-auto'
          style={{
            maxHeight: 'calc(2 / 3 * 100vh)',
          }}
        >
          
          {/* <div className='sticky top-0 bg-white flex items-center pl-4 pr-3 pt-3 h-[44px] text-md font-semibold text-gray-900 dark:text-white z-[1]'> */}
          <div className='sticky top-0 bg-white dark:bg-[#333333] flex items-center pl-4 pr-3 pt-3 h-[44px] text-md font-semibold text-gray-900 dark:text-white z-[1]'>
            <div className='grow'>{t('workflow.panel.checklist')}{needWarningNodes.length ? `(${needWarningNodes.length})` : ''}</div>
            <div
              className='shrink-0 flex items-center justify-center w-6 h-6 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <XClose className='w-4 h-4 text-gray-500' />
            </div>
          </div>
          <div className='py-2'>
            {
              !!needWarningNodes.length && (
                <>
                  <div className='px-4 text-xs text-gray-400'>{t('workflow.panel.checklistTip')}</div>
                  <div className='px-4 py-2'>
                    {
                      needWarningNodes.map(node => (
                        <div
                          key={node.id}
                          // className='mb-2 last-of-type:mb-0 border-[0.5px] border-gray-200 bg-white  shadow-xs rounded-lg cursor-pointer dark:bg-[#3f3f3f] overflow-hidden'
                          className='mb-2 last-of-type:mb-0 border-[0.5px] border-gray-200 dark:border-[#5F5F5F] bg-white  shadow-xs rounded-lg cursor-pointer dark:bg-[#3f3f3f] overflow-hidden'
                          onClick={() => {
                            handleNodeSelect(node.id)
                            setOpen(false)
                          }}
                        >
                          {/* <div className='flex items-center p-2 h-9 text-xs font-medium text-gray-700'> */}
                          <div className='flex items-center p-2 h-9 text-xs font-medium text-gray-700 dark:bg-[#383838] dark:text-white'>

                            <BlockIcon
                              type={node.type}
                              className='mr-1.5'
                              toolIcon={node.toolIcon}
                            />
                            {node.title}
                          </div>
                          <div className='border-t-[0.5px] border-t-black/2'>
                            {
                              node.unConnected && (
                                // <div className='px-3 py-2 bg-gray-25 rounded-b-lg dark:bg-[#5f5f5f]'>
                                <div className='px-3 py-2 bg-gray-25 dark:bg-[#3F3F3F]'>

                                  <div className='flex text-xs leading-[18px] text-gray-500 dark:text-[#fcfcfc]'>
                                    <AlertTriangle className='mt-[3px] mr-2 w-3 h-3 text-[#F79009]' />
                                    {t('workflow.common.needConnecttip')}
                                  </div>
                                </div>
                              )
                            }
                            {
                              node.errorMessage && (
                                <div className='px-3 py-2 bg-gray-25 rounded-b-lg dark:bg-[#3F3F3F]'>
                                  <div className='flex text-xs leading-[18px] text-gray-500 dark:text-[#fcfcfc]'>
                                    <AlertTriangle className='mt-[3px] mr-2 w-3 h-3 text-[#F79009]' />
                                    {node.errorMessage}
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
              )
            }
            {
              !needWarningNodes.length && (
                <div className='mx-4 mb-3 py-4 rounded-lg bg-gray-50 dark:bg-[#3F3F3F] text-gray-400 text-xs text-center'>
                  <ChecklistSquare className='mx-auto mb-[5px] w-8 h-8 text-gray-300' />
                  {t('workflow.panel.checklistResolved')}
                </div>
              )
            }
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default memo(WorkflowChecklist)
