import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { useStore } from '../store'
import {
  useIsChatMode,
  useWorkflowRun,
  useWorkflowStartRun,
} from '../hooks'
import { WorkflowRunningStatus } from '../types'
import ViewHistory from './view-history'
import {
  Play,
  StopCircle,
} from '@/app/components/base/icons/src/vender/line/mediaAndDevices'
import { Loading02 } from '@/app/components/base/icons/src/vender/line/general'
import { MessagePlay } from '@/app/components/base/icons/src/vender/line/communication'

const RunMode = memo(() => {
  const { t } = useTranslation()
  const { handleWorkflowStartRunInWorkflow } = useWorkflowStartRun()
  const { handleStopRun } = useWorkflowRun()
  const workflowRunningData = useStore(s => s.workflowRunningData)
  const isRunning = workflowRunningData?.result.status === WorkflowRunningStatus.Running

  return (
    <>
      <div
        className={cn(
          'flex items-center px-1.5 h-7 rounded-md text-[13px] font-medium text-primary-600',
          'hover:bg-primary-50 cursor-pointer',
          isRunning && 'bg-primary-50 !cursor-not-allowed',
        )}
        onClick={() => handleWorkflowStartRunInWorkflow()}
      >
        {
          isRunning
            ? (
              <>
                <Loading02 className='mr-1 w-4 h-4 animate-spin' />
                {t('workflow.common.running')}
              </>
            )
            : (
              <>
                <Play className='mr-1 w-4 h-4' />
                {t('workflow.common.run')}
              </>
            )
        }
      </div>
      {
        isRunning && (
          <div
            className='flex items-center justify-center ml-0.5 w-7 h-7 cursor-pointer hover:bg-black/5 rounded-md'
            onClick={() => handleStopRun(workflowRunningData?.task_id || '')}
          >
            <StopCircle className='w-4 h-4 text-gray-500' />
          </div>
        )
      }
    </>
  )
})
RunMode.displayName = 'RunMode'

const PreviewMode = memo(() => {
  const { t } = useTranslation()
  const { handleWorkflowStartRunInChatflow } = useWorkflowStartRun()

  return (
    <div
      className={cn(
        'flex items-center px-1.5 h-7 rounded-md text-[13px] font-medium text-primary-600',
        'hover:bg-primary-50 dark:hover:bg-zinc-800 cursor-pointer',
      )}
      onClick={() => handleWorkflowStartRunInChatflow()}
    >
      <MessagePlay className='mr-1 w-4 h-4' />
      {t('workflow.common.debugAndPreview')}
    </div>
  )
})
PreviewMode.displayName = 'PreviewMode'

const RunAndHistory: FC = () => {
  const isChatMode = useIsChatMode()

  return (
<<<<<<< HEAD
    // <div className='flex items-center px-0.5 h-8 rounded-lg border-[0.5px] border-gray-200 bg-white ${getDarkThemeClasses('background')} shadow-xs dark:hover:bg-zinc-800'>
=======
    // <div className='flex items-center px-0.5 h-8 rounded-lg border-[0.5px] border-gray-200 bg-white dark:bg-[#202020] shadow-xs dark:hover:bg-zinc-800'>
>>>>>>> origin/rupa
    <div className='flex items-center px-0.5 h-8 rounded-lg border-[0.5px] border-gray-200 bg-white dark:bg-[#333333] shadow-xs dark:hover:bg-zinc-800 dark:border-2 dark:border-[#3F3F3F] dark:border-solid dark:shadow-sm'>
      {
        !isChatMode && <RunMode />
      }
      {
        isChatMode && <PreviewMode />
      }
      {/* <div className='mx-0.5 w-[0.5px] h-8 bg-gray-200'></div> */}
      <div className='mx-0.5 w-[0.5px] h-8 bg-gray-200 dark:border-2 dark:border-[#3F3F3F] dark:border-solid dark:shadow-sm'></div>
      <ViewHistory />
    </div>
  )
}

export default memo(RunAndHistory)
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
