'use client'
import type { MouseEventHandler } from 'react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useContext, useContextSelector } from 'use-context-selector'
import s from './style.module.css'
import AppsContext, { useAppContext } from '@/context/app-context'
import { useProviderContext } from '@/context/provider-context'
import { ToastContext } from '@/app/components/base/toast'
import type { AppMode } from '@/types/app'
import { createApp } from '@/service/apps'
import Modal from '@/app/components/base/modal'
import Button from '@/app/components/base/button'
import AppIcon from '@/app/components/base/app-icon'
import EmojiPicker from '@/app/components/base/emoji-picker'
import AppsFull from '@/app/components/billing/apps-full-in-dialog'
import { AiText, ChatBot, CuteRobote } from '@/app/components/base/icons/src/vender/solid/communication'
import { HelpCircle, XClose } from '@/app/components/base/icons/src/vender/line/general'
import { Route } from '@/app/components/base/icons/src/vender/solid/mapsAndTravel'
import TooltipPlus from '@/app/components/base/tooltip-plus'
import { NEED_REFRESH_APP_LIST_KEY } from '@/config'
import { getRedirection } from '@/utils/app-redirection'
import { getDarkThemeClasses } from '@/app/theme'
 
type CreateAppDialogProps = {
  show: boolean
  onSuccess: () => void
  onClose: () => void
}
 
const CreateAppModal = ({ show, onSuccess, onClose }: CreateAppDialogProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { notify } = useContext(ToastContext)
  const mutateApps = useContextSelector(AppsContext, state => state.mutateApps)
 
  const [appMode, setAppMode] = useState<AppMode>('chat')
  const [showChatBotType, setShowChatBotType] = useState<boolean>(true)
  const [emoji, setEmoji] = useState({ icon: '🤖', icon_background: '#FFEAD5' })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
 
  const { plan, enableBilling } = useProviderContext()
  const isAppsFull = (enableBilling && plan.usage.buildApps >= plan.total.buildApps)
  const { isCurrentWorkspaceEditor } = useAppContext()
 
  const isCreatingRef = useRef(false)
  const onCreate: MouseEventHandler = useCallback(async () => {
    if (!appMode) {
      notify({ type: 'error', message: t('app.newApp.appTypeRequired') })
      return
    }
    if (!name.trim()) {
      notify({ type: 'error', message: t('app.newApp.nameNotEmpty') })
      return
    }
    if (isCreatingRef.current)
      return
    isCreatingRef.current = true
    try {
      const app = await createApp({
        name,
        description,
        icon: emoji.icon,
        icon_background: emoji.icon_background,
        mode: appMode,
      })
      notify({ type: 'success', message: t('app.newApp.appCreated') })
      onSuccess()
      onClose()
      mutateApps()
      localStorage.setItem(NEED_REFRESH_APP_LIST_KEY, '1')
      getRedirection(isCurrentWorkspaceEditor, app, push)
    }
    catch (e) {
      notify({ type: 'error', message: t('app.newApp.appCreateFailed') })
    }
    isCreatingRef.current = false
  }, [name, notify, t, appMode, emoji.icon, emoji.icon_background, description, onSuccess, onClose, mutateApps, push, isCurrentWorkspaceEditor])
 
  return (
    <Modal
      overflowVisible
      wrapperClassName='z-20'
      // className='!p-0 !max-w-[720px] !w-[720px] rounded-xl '
      // className='!p-0 !max-w-[720px] !w-[720px] rounded-xl dark:shadow-slate-700 dark:shadow-sm'
      className={`!p-0 !max-w-[720px] !w-[720px] rounded-xl ${getDarkThemeClasses('shadow1')} dark:shadow-sm`}
      isShow={show}
      onClose={() => { }}
    >
      {/* Heading */}
      {/* <div className='shrink-0 flex flex-col h-full bg-white rounded-t-xl'> */}
      {/* <div className='shrink-0 flex flex-col h-full bg-white rounded-t-xl dark:bg-[#202020]'> */}
      <div className={`shrink-0 flex flex-col h-full bg-white rounded-t-xl ${getDarkThemeClasses('background1')}`}>
        {/* <div className='shrink-0 pl-8 pr-6 pt-6 pb-3 bg-white text-xl rounded-t-xl leading-[30px] font-semibold text-gray-900 z-10'>{t('app.newApp.startFromBlank')}</div> */}
        {/* <div className='shrink-0 pl-8 pr-6 pt-6 pb-3 bg-white text-xl rounded-t-xl leading-[30px] font-semibold text-gray-900 z-10 dark:bg-[#202020] dark:text-white'>{t('app.newApp.startFromBlank')}</div> */}
        <div className={`shrink-0 pl-8 pr-6 pt-6 pb-3 bg-white text-xl rounded-t-xl leading-[30px] font-semibold text-gray-900 z-10 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.startFromBlank')}</div>
      </div>
      {/* app type */}
      {/* <div className='py-2 px-8 '> */}
      {/* <div className='py-2 px-8 dark:bg-[#202020]'> */}
      <div className={`py-2 px-8 ${getDarkThemeClasses('background1')}`}>
        {/* <div className='py-2 text-sm leading-[20px] font-medium text-gray-900 '>{t('app.newApp.captionAppType')}</div> */}
        {/* <div className='py-2 text-sm leading-[20px] font-medium text-gray-900 dark:bg-[#202020] dark:text-white'>{t('app.newApp.captionAppType')}</div> */}
        <div className={`py-2 text-sm leading-[20px] font-medium text-gray-900 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.captionAppType')}</div>
        <div className='flex'>
          <TooltipPlus
            hideArrow
            popupContent={
              // <div className='max-w-[280px] leading-[18px] text-xs text-gray-700 '>{t('app.newApp.chatbotDescription')}</div>
              // <div className='max-w-[280px] leading-[18px] text-xs text-gray-700 dark:bg-[#3f3f3f] dark:text-white'>{t('app.newApp.chatbotDescription')}</div>
              <div className={`max-w-[280px] leading-[18px] text-xs text-gray-700 ${getDarkThemeClasses('background3')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.chatbotDescription')}</div>
            }
          >
            <div
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white text-gray-700 cursor-pointer shadow-xs hover:border-gray-300',
              //   showChatBotType && 'border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              //   s['grid-bg-chat'],
              // )}
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white text-gray-700 cursor-pointer shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   showChatBotType && 'border-[3px] border-primary-400 dark:border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:hover:border-primary-400',
              //   s['grid-bg-chat'],
              // )}
              className={cn(
                `relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white text-gray-700 cursor-pointer shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                showChatBotType && `border-[3px] border-primary-400 ${getDarkThemeClasses('border3')} hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('borderhover2')}`,
                s['grid-bg-chat'],
              )}
              onClick={() => {
                setAppMode('chat')
                setShowChatBotType(true)
              }}
            >
              {/* <ChatBot className='w-6 h-6 text-[#1570EF]' /> */}
              <img src="assets/4.png" alt="Chat Bot" className="w-6 h-6" />
              <div className='h-5 text-[13px] font-medium leading-[18px]'>{t('app.types.chatbot')}</div>
            </div>
          </TooltipPlus>
          <TooltipPlus
            hideArrow
            popupContent={
              // <div className='flex flex-col max-w-[320px] leading-[18px] text-xs'>
              <div className={`flex flex-col max-w-[320px] leading-[18px] text-xs ${getDarkThemeClasses('background3')}`}>
                {/* <div className='text-gray-700'>{t('app.newApp.completionDescription')}</div> */}
                <div className={`text-gray-700 ${getDarkThemeClasses('background3')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.completionDescription')}</div>
              </div>
            }
          >
            <div
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300',
              //   s['grid-bg-completion'],
              //   appMode === 'completion' && 'border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   s['grid-bg-completion'],
              //   appMode === 'completion' && 'border-[3px] border-primary-400 dark:border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:hover:border-primary-400',
              // )}
              className={cn(
                `relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                s['grid-bg-completion'],
                appMode === 'completion' && `border-[3px] border-primary-400 ${getDarkThemeClasses('border3')} hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('borderhover2')}`,
              )}
              onClick={() => {
                setAppMode('completion')
                setShowChatBotType(false)
              }}
            >
              {/* <AiText className='w-6 h-6 text-[#0E9384]' /> */}
              <img src="assets/2.png" alt="Ai Text" className="w-6 h-6" />
              <div className='h-5 text-[13px] font-medium leading-[18px]'>{t('app.newApp.completeApp')}</div>
            </div>
          </TooltipPlus>
          <TooltipPlus
            hideArrow
            popupContent={
              // <div className='max-w-[280px] leading-[18px] text-xs text-gray-700'>{t('app.newApp.agentDescription')}</div>
              // <div className='max-w-[280px] leading-[18px] text-xs text-gray-700 dark:bg-[#3f3f3f] dark:text-white p-2'>{t('app.newApp.agentDescription')}</div>
              <div className={`max-w-[280px] leading-[18px] text-xs text-gray-700 ${getDarkThemeClasses('background3')} ${getDarkThemeClasses('text')} p-2`}>{t('app.newApp.agentDescription')}</div>
            }
          >
            <div
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300',
              //   s['grid-bg-agent-chat'],
              //   appMode === 'agent-chat' && 'border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   s['grid-bg-agent-chat'],
              //   appMode === 'agent-chat' && 'border-[3px] border-primary-400 dark:border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:hover:border-primary-400',
              // )}
              className={cn(
                `relative grow box-border w-[158px] mr-2 px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                s['grid-bg-agent-chat'],
                appMode === 'agent-chat' && `border-[3px] border-primary-400 ${getDarkThemeClasses('border3')} hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('borderhover2')}`,
              )}
              onClick={() => {
                setAppMode('agent-chat')
                setShowChatBotType(false)
              }}
            >
              {/* <CuteRobote className='w-6 h-6 text-indigo-600' /> */}
              <img src="assets/1.png" alt="Cute Robote" className="w-6 h-6" />
              <div className='h-5 text-[13px] font-medium leading-[18px]'>{t('app.types.agent')}</div>
            </div>
          </TooltipPlus>
          <TooltipPlus
            hideArrow
            popupContent={
              <div className='flex flex-col max-w-[320px] leading-[18px] text-xs'>
                {/* <div className='text-gray-700'>{t('app.newApp.workflowDescription')}</div> */}
                {/* <div className='text-gray-700 dark:bg-[#3f3f3f] dark:text-white'>{t('app.newApp.workflowDescription')}</div> */}
                <div className={`text-gray-700 ${getDarkThemeClasses('background3')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.workflowDescription')}</div>
              </div>
            }
          >
            <div
              // className={cn(
              //   'relative grow box-border w-[158px] px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300',
              //   s['grid-bg-workflow'],
              //   appMode === 'workflow' && 'border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow box-border w-[158px] px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   s['grid-bg-workflow'],
              //   appMode === 'workflow' && 'border-[3px] border-primary-400 dark:border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:hover:border-primary-400',
              // )}
              className={cn(
                `relative grow box-border w-[158px] px-0.5 pt-3 pb-2 flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 text-gray-700 cursor-pointer bg-white shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                s['grid-bg-workflow'],
                appMode === 'workflow' && `border-[3px] border-primary-400 ${getDarkThemeClasses('border3')} hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('borderhover2')}`,
              )}
              onClick={() => {
                setAppMode('workflow')
                setShowChatBotType(false)
              }}
            >
              {/* <Route className='w-6 h-6 text-[#f79009]' /> */}
              <img src="assets/3.png" alt="Route" className="w-6 h-6" />
              <div className='h-5 text-[13px] font-medium leading-[18px]'>{t('app.types.workflow')}</div>
              {/* <span className='absolute top-[-3px] right-[-3px] px-1 rounded-[5px] bg-white border border-black/8 text-gray-500 text-[10px] leading-[18px] font-medium'>BETA</span> */}
            </div>
          </TooltipPlus>
        </div>
      </div>
      {showChatBotType && (
        // <div className='py-2 px-8'>
        // <div className='py-2 px-8 dark:bg-[#202020]'>
        <div className={`py-2 px-8 ${getDarkThemeClasses('background1')}`}>
          {/* <div className='py-2 text-sm leading-[20px] font-medium text-gray-900'>{t('app.newApp.chatbotType')}</div> */}
          {/* <div className='py-2 text-sm leading-[20px] font-medium text-gray-900 dark:bg-[#202020] dark:text-white'>{t('app.newApp.chatbotType')}</div> */}
          <div className={`py-2 text-sm leading-[20px] font-medium text-gray-900 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.chatbotType')}</div>
          <div className='flex gap-2'>
            <div
              // className={cn(
              //   'relative grow flex-[50%] pl-4 py-[10px] pr-[10px] rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300',
              //   appMode === 'chat' && 'bg-white shadow-xs border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow flex-[50%] pl-4 py-[10px] pr-[10px] rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   appMode === 'chat' && 'bg-white shadow-xs border-[3px] border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:border-primary-400 dark:hover:border-primary-400',
              // )}
              className={cn(
                `relative grow flex-[50%] pl-4 py-[10px] pr-[10px] rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                appMode === 'chat' && `bg-white shadow-xs border-[3px] border-primary-400 hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('border3')} ${getDarkThemeClasses('borderhover2')}`,
              )}
              onClick={() => {
                setAppMode('chat')
              }}
            >
              <div className='flex items-center justify-between'>
                <div className='h-5 text-sm font-medium leading-5'>{t('app.newApp.basic')}</div>
                <div className='group'>
                  {/* <HelpCircle className='w-[14px] h-[14px] text-gray-400 hover:text-gray-500' /> */}
                  {/* <HelpCircle className='w-[14px] h-[14px] text-gray-400 hover:text-gray-500 dark:text-white' /> */}
                  <HelpCircle className={`w-[14px] h-[14px] text-gray-400 hover:text-gray-500 ${getDarkThemeClasses('text')}`} />
                  <div
                    // className={cn(
                    //   'hidden z-20 absolute left-[327px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block',
                    // )}
                    // className={cn(
                    //   'hidden z-20 absolute left-[327px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block dark:bg-[#3f3f3f] dark:text-white dark:shadow-slate-700 dark:shadow-sm',
                    // )}
                    className={cn(
                      `hidden z-20 absolute left-[327px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('shadow1')} dark:shadow-sm`,
                    )}
                  >
                    {/* <div className={cn('w-full h-[256px] bg-center bg-no-repeat bg-contain rounded-xl', s.basicPic)}/> */}
                    <div className='px-4 pb-2'>
                      <div className='flex items-center justify-between'>
                        {/* <div className='text-gray-700 text-md leading-6 font-semibold'>{t('app.newApp.basic')}</div> */}
                        {/* <div className='text-gray-700 text-md leading-6 font-semibold dark:text-gray-200'>{t('app.newApp.basic')}</div> */}
                        <div className={`text-gray-700 text-md leading-6 font-semibold ${getDarkThemeClasses('sub_text6')}`}>{t('app.newApp.basic')}</div>
                        <div className='text-orange-500 text-xs leading-[18px] font-medium'>{t('app.newApp.basicFor')}</div>
                      </div>
                      {/* <div className='mt-1 text-gray-500 text-sm leading-5'>{t('app.newApp.basicDescription')}</div> */}
                      {/* <div className='mt-1 text-gray-500 text-sm leading-5 dark:text-gray-400'>{t('app.newApp.basicDescription')}</div> */}
                      <div className={`mt-1 text-gray-500 text-sm leading-5 ${getDarkThemeClasses('sub_text7')}`}>{t('app.newApp.basicDescription')}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='mt-[2px] text-gray-500 text-xs leading-[18px]'>{t('app.newApp.basicTip')}</div> */}
              {/* <div className='mt-[2px] text-gray-500 text-xs leading-[18px] dark:text-slate-400'>{t('app.newApp.basicTip')}</div> */}
              <div className={`mt-[2px] text-gray-500 text-xs leading-[18px] ${getDarkThemeClasses('sub_text8')}`}>{t('app.newApp.basicTip')}</div>
            </div>
            <div
              // className={cn(
              //   'relative grow flex-[50%] pl-3 py-2 pr-2 rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300',
              //   appMode === 'advanced-chat' && 'bg-white shadow-xs border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow flex-[50%] pl-3 py-2 pr-2 rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400',
              //   appMode === 'advanced-chat' && 'bg-white shadow-xs border-[1.5px] border-primary-400 hover:border-[1.5px] hover:border-primary-400',
              // )}
              // className={cn(
              //   'relative grow flex-[50%] pl-3 py-2 pr-2 rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300 dark:bg-[#3f3f3f] dark:text-white dark:border-slate-400 dark:hover:border-[#5F5F5F]',
              //   appMode === 'advanced-chat' && 'bg-white shadow-xs border-[3px] border-primary-400 hover:border-[1.5px] hover:border-primary-400 dark:border-primary-400 dark:hover:border-primary-400',
              // )}
              className={cn(
                `relative grow flex-[50%] pl-3 py-2 pr-2 rounded-lg border border-gray-100 bg-gray-25 text-gray-700 cursor-pointer hover:bg-white hover:shadow-xs hover:border-gray-300 ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border2')} ${getDarkThemeClasses('borderhover')}`,
                appMode === 'advanced-chat' && `bg-white shadow-xs border-[3px] border-primary-400 hover:border-[1.5px] hover:border-primary-400 ${getDarkThemeClasses('border3')} ${getDarkThemeClasses('borderhover2')}`,
              )}
              onClick={() => {
                setAppMode('advanced-chat')
              }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='mr-1 h-5 text-sm font-medium leading-5'>{t('app.newApp.advanced')}</div>
                  {/* <span className='px-1 rounded-[5px] bg-white border border-black/8 text-gray-500 text-[10px] leading-[18px] font-medium'>BETA</span> */}
                </div>
                <div className='group'>
                  {/* <HelpCircle className='w-[14px] h-[14px] text-gray-400 hover:text-gray-500' /> */}
                  {/* <HelpCircle className='w-[14px] h-[14px] text-gray-400 hover:text-gray-500 dark:text-white' /> */}
                  <HelpCircle className={`w-[14px] h-[14px] text-gray-400 hover:text-gray-500 ${getDarkThemeClasses('text')}`} />
                  <div
                    // className={cn(
                    //   // 'hidden z-20 absolute right-[26px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block',
                    //   'hidden z-20 absolute right-[26px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block dark:bg-[#3f3f3f] dark:text-white dark:shadow-slate-700 dark:shadow-sm',
                    // )}
                    className={cn(
                      // 'hidden z-20 absolute right-[26px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block',
                      `hidden z-20 absolute right-[26px] top-[-158px] w-[376px] rounded-xl bg-white border-[0.5px] border-[rgba(0,0,0,0.05)] shadow-lg group-hover:block ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('shadow1')} dark:shadow-sm`,
                    )}
                  >
                    {/* <div className={cn('w-full h-[256px] bg-center bg-no-repeat bg-contain rounded-xl', s.advancedPic)}/> */}
                    <div className='px-4 pb-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          {/* <div className='mr-1 text-gray-700 text-md leading-6 font-semibold'>{t('app.newApp.advanced')}</div> */}
                          {/* <div className='mr-1 text-gray-700 text-md leading-6 font-semibold dark:text-gray-200'>{t('app.newApp.advanced')}</div> */}
                          <div className={`mr-1 text-gray-700 text-md leading-6 font-semibold ${getDarkThemeClasses('sub_text6')}`}>{t('app.newApp.advanced')}</div>
                          {/* <span className='px-1 rounded-[5px] bg-white border border-black/8 text-gray-500 text-[10px] leading-[18px] font-medium'>BETA</span> */}
                        </div>
                        <div className='text-orange-500 text-xs leading-[18px] font-medium'>{t('app.newApp.advancedFor').toLocaleUpperCase()}</div>
                      </div>
                      {/* <div className='mt-1 text-gray-500 text-sm leading-5'>{t('app.newApp.advancedDescription')}</div> */}
                      {/* <div className='mt-1 text-gray-500 text-sm leading-5 dark:text-gray-400'>{t('app.newApp.advancedDescription')}</div> */}
                      <div className={`mt-1 text-gray-500 text-sm leading-5 ${getDarkThemeClasses('sub_text7')}`}>{t('app.newApp.advancedDescription')}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='mt-[2px] text-gray-500 text-xs leading-[18px]'>{t('app.newApp.advancedFor')}</div> */}
              {/* <div className='mt-[2px] text-gray-500 text-xs leading-[18px] dark:text-slate-400'>{t('app.newApp.advancedFor')}</div> */}
              <div className={`mt-[2px] text-gray-500 text-xs leading-[18px] ${getDarkThemeClasses('sub_text8')}`}>{t('app.newApp.advancedFor')}</div>
 
            </div>
          </div>
        </div>
      )}
 
      {/* icon & name */}
      {/* <div className='pt-2 px-8'> */}
      {/* <div className='pt-2 px-8 dark:bg-[#202020]'> */}
      <div className={`pt-2 px-8 ${getDarkThemeClasses('background1')}`}>
        {/* <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('app.newApp.captionName')}</div> */}
        {/* <div className='py-2 text-sm font-medium leading-[20px] text-gray-900 dark:bg-[#202020] dark:text-white'>{t('app.newApp.captionName')}</div> */}
        <div className={`py-2 text-sm font-medium leading-[20px] text-gray-900 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.captionName')}</div>
        <div className='flex items-center justify-between space-x-2'>
          {/* <AppIcon size='large' onClick={() => { setShowEmojiPicker(true) }} className='cursor-pointer' icon={emoji.icon} background={emoji.icon_background} /> */}
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('app.newApp.appNamePlaceholder') || ''}
            // className='grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs'
            // className='grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs dark:bg-[#3f3f3f] dark:text-white dark:hover:border-[#5F5F5F] dark:focus:border-[#5F5F5F]'
             className={`grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('borderhover')} ${getDarkThemeClasses('borderfocus')} `}
          />
        </div>
        {showEmojiPicker && <EmojiPicker
          onSelect={(icon, icon_background) => {
            setEmoji({ icon, icon_background })
            setShowEmojiPicker(false)
          }}
          onClose={() => {
            setEmoji({ icon: '🤖', icon_background: '#FFEAD5' })
            setShowEmojiPicker(false)
          }}
        />}
      </div>
      {/* description */}
      {/* <div className='pt-2 px-8'>
        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('app.newApp.captionDescription')}</div> */}
      {/* <div className='pt-2 px-8 dark:bg-[#202020]'>
        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900 dark:bg-[#202020] dark:text-white'>{t('app.newApp.captionDescription')}</div> */}
        <div className={`pt-2 px-8 ${getDarkThemeClasses('background1')}`}>
        <div className={`py-2 text-sm font-medium leading-[20px] text-gray-900 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}>{t('app.newApp.captionDescription')}</div>
        <textarea
          // className='w-full h-10 px-3 py-2 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs h-[80px] resize-none'
          // className='w-full h-10 px-3 py-2 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs h-[80px] resize-none dark:bg-[#3f3f3f] dark:text-white dark:hover:border-[#5F5F5F] dark:focus:border-[#5F5F5F]'
           className={`w-full h-10 px-3 py-2 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs h-[80px] resize-none ${getDarkThemeClasses('background2')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('borderhover')} ${getDarkThemeClasses('borderfocus')}`}
          placeholder={t('app.newApp.appDescriptionPlaceholder') || ''}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      {isAppsFull && (
        <div className='px-8 py-2'>
          <AppsFull loc='app-create' />
        </div>
      )}
      {/* <div className='px-8 py-6 flex justify-end'>
        <Button className='mr-2 text-gray-700 text-sm font-medium' onClick={onClose}>{t('app.newApp.Cancel')}</Button> */}
      {/* <div className='px-8 py-6 flex justify-end dark:bg-[#202020]'> */}
      <div className={`px-8 py-6 flex justify-end ${getDarkThemeClasses('background1')}`}>
        {/* <Button className='mr-2 text-gray-700 text-sm font-medium dark:bg-[#202020] dark:text-white dark:hover:bg-zinc-800 dark:border-[#5F5F5F]' onClick={onClose}>{t('app.newApp.Cancel')}</Button> */}
        <Button className={`mr-2 text-gray-700 text-sm font-medium ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('hover')} ${getDarkThemeClasses('border')}`} onClick={onClose}>{t('app.newApp.Cancel')}</Button>
        <Button className='text-sm font-medium' disabled={isAppsFull || !name} type="primary" onClick={onCreate}>{t('app.newApp.Create')}</Button>
      </div>
      <div className='absolute right-6 top-6 p-2 cursor-pointer z-20' onClick={onClose}>
        {/* <XClose className='w-4 h-4 text-gray-500' /> */}
        {/* <XClose className='w-4 h-4 text-gray-500 dark:text-white' /> */}
        <XClose className={`w-4 h-4 text-gray-500 ${getDarkThemeClasses('text')}`} />
      </div>
    </Modal>
  )
}
 
export default CreateAppModal
 