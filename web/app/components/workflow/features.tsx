import {
  memo,
  useCallback,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from './store'
import {
  useIsChatMode,
  useNodesReadOnly,
  useNodesSyncDraft,
} from './hooks'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import {
  FeaturesChoose,
  FeaturesPanel,
} from '@/app/components/base/features'
import { getDarkThemeClasses } from '@/app/theme'
const Features = () => {
  const { t } = useTranslation()
  const isChatMode = useIsChatMode()
  const setShowFeaturesPanel = useStore(s => s.setShowFeaturesPanel)
  const { nodesReadOnly } = useNodesReadOnly()
  const { handleSyncWorkflowDraft } = useNodesSyncDraft()

  const handleFeaturesChange = useCallback(() => {
    handleSyncWorkflowDraft()
  }, [handleSyncWorkflowDraft])

  return (
    // <div className='fixed top-16 left-2 bottom-2 w-[600px] rounded-2xl border-[0.5px] border-gray-200 bg-white shadow-xl z-10'>
    // <div className='fixed top-16 right-2 bottom-4 w-[600px] rounded-2xl border-[0.5px] border-gray-200 bg-white shadow-xl z-10'>
    // <div className='fixed top-16 right-6 bottom-4 w-[600px] rounded-2xl border-[0.5px] border-gray-200 bg-white shadow-xl z-10 overflow-y-auto'>
    <div className={`fixed top-16 right-6 bottom-4 w-[600px] rounded-2xl border-[0.5px] border-gray-200 ${getDarkThemeClasses('border1')} bg-white ${getDarkThemeClasses('main_background')} shadow-xl z-10 overflow-y-auto`}>
       {/* <div className='flex items-center justify-between px-4 pt-3'> */}
      <div className={`flex items-center justify-between px-4 pt-3 ${getDarkThemeClasses('text')}`}>
        {t('workflow.common.features')} 
        <div className='flex items-center'>
          {
            isChatMode && (
              <>
                <FeaturesChoose
                  disabled={nodesReadOnly}
                  onChange={handleFeaturesChange}
                />
                <div className='mx-3 w-[1px] h-[14px] bg-gray-200 '></div>
              </>
            )
          }
          <div
            className='flex items-center justify-center w-6 h-6 cursor-pointer'
            onClick={() => setShowFeaturesPanel(false)}
          >
            <XClose className='w-4 h-4 text-gray-500' />
          </div>
        </div>
      </div>
      <div className='p-4'>
        <FeaturesPanel
          disabled={nodesReadOnly}
          onChange={handleFeaturesChange}
          openingStatementProps={{
            onAutoAddPromptVariable: () => { },
          }}
        />
      </div>
    </div>
  )
}

export default memo(Features)
