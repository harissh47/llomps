 
'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useBoolean } from 'ahooks'
import type { OffsetOptions, Placement } from '@floating-ui/react'
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from '@/app/components/base/portal-to-follow-elem'
import { getDarkThemeClasses } from '@/app/theme'
 
export type TooltipProps = {
  position?: Placement
  triggerMethod?: 'hover' | 'click'
  popupContent: React.ReactNode
  children: React.ReactNode
  hideArrow?: boolean
  popupClassName?: string
  offset?: OffsetOptions
}
 
// const arrow = (
//   <svg className="absolute text-white dark:text-[#3F3F3F] h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
// )
 
const arrow = (
  <svg className={`absolute ${getDarkThemeClasses('text')} ${getDarkThemeClasses('sub_text9')} h-2 w-full left-0 top-full`} x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
)
 
const Tooltip: FC<TooltipProps> = ({
  position = 'top',
  triggerMethod = 'hover',
  popupContent,
  children,
  hideArrow,
  popupClassName,
  offset,
}) => {
  const [open, setOpen] = useState(false)
  const [isHoverPopup, {
    setTrue: setHoverPopup,
    setFalse: setNotHoverPopup,
  }] = useBoolean(false)
 
  const isHoverPopupRef = useRef(isHoverPopup)
  useEffect(() => {
    isHoverPopupRef.current = isHoverPopup
  }, [isHoverPopup])
 
  const [isHoverTrigger, {
    setTrue: setHoverTrigger,
    setFalse: setNotHoverTrigger,
  }] = useBoolean(false)
 
  const isHoverTriggerRef = useRef(isHoverTrigger)
  useEffect(() => {
    isHoverTriggerRef.current = isHoverTrigger
  }, [isHoverTrigger])
 
  const handleLeave = (isTrigger: boolean) => {
    if (isTrigger)
      setNotHoverTrigger()
 
    else
      setNotHoverPopup()
 
    // give time to move to the popup
    setTimeout(() => {
      if (!isHoverPopupRef.current && !isHoverTriggerRef.current)
        setOpen(false)
    }, 500)
  }
 
  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement={position}
      offset={offset ?? 10}
    >
      <PortalToFollowElemTrigger
        onClick={() => triggerMethod === 'click' && setOpen(v => !v)}
        onMouseEnter={() => {
          if (triggerMethod === 'hover') {
            setHoverTrigger()
            setOpen(true)
          }
        }}
        onMouseLeave={() => triggerMethod === 'hover' && handleLeave(true)}
      >
        {children}
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent
        className="z-[9999]"
      >
        {/* <div
          className={cn(
            'relative px-3 py-2 text-xs font-normal text-gray-700 bg-white rounded-md shadow-sm dark:bg-[#3F3F3F] dark:border-[#5F5F5F] dark:shadow-[#5F5F5F] shadow dark:text-[#FCFCFC]',
            popupClassName,
          )}
          onMouseEnter={() => triggerMethod === 'hover' && setHoverPopup()}
          onMouseLeave={() => triggerMethod === 'hover' && handleLeave(false)}
        >
          {popupContent}
          {!hideArrow && arrow}
        </div> */}
         <div
          className={cn(
            `relative px-3 py-2 text-xs font-normal text-gray-700 bg-white rounded-md shadow-sm ${getDarkThemeClasses('background3')} ${getDarkThemeClasses('border')} ${getDarkThemeClasses('shadow')} shadow ${getDarkThemeClasses('sub_text1')}`,
            popupClassName,
          )}
          onMouseEnter={() => triggerMethod === 'hover' && setHoverPopup()}
          onMouseLeave={() => triggerMethod === 'hover' && handleLeave(false)}
        >
          {popupContent}
          {!hideArrow && arrow}
        </div>
 
 
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}
 
export default React.memo(Tooltip)