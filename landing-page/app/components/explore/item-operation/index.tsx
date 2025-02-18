'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
// import { useTranslation } from 'react-i18next'
import { useBoolean } from 'ahooks'
import { Edit03, Pin02, Trash03 } from '../../base/icons/src/vender/line/general'

import s from './style.module.css'
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from '@/app/components/base/portal-to-follow-elem'

export type IItemOperationProps = {
    className?: string
    isItemHovering?: boolean
    isPinned: boolean
    isShowRenameConversation?: boolean
    onRenameConversation?: () => void
    isShowDelete: boolean
    togglePin: () => void
    onDelete: () => void
}

const ItemOperation: FC<IItemOperationProps> = ({
    className,
    isItemHovering,
    isPinned,
    togglePin,
    isShowRenameConversation,
    onRenameConversation,
    isShowDelete,
    onDelete,
}) => {
    //   const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const [isHovering, { setTrue: setIsHovering, setFalse: setNotHovering }] = useBoolean(false)
    useEffect(() => {
        if (!isItemHovering && !isHovering)
            setOpen(false)
    }, [isItemHovering, isHovering])
    return (
        <PortalToFollowElem
            open={open}
            onOpenChange={setOpen}
            placement='bottom-end'
            offset={4}
        >
            <PortalToFollowElemTrigger
                onClick={() => setOpen(v => !v)}
            >
                <div className={cn(className, s.btn, 'h-6 w-6 rounded-md border-none py-1', (isItemHovering || open) && `${s.open} !bg-gray-100 !shadow-none`)}></div>
            </PortalToFollowElemTrigger>
            <PortalToFollowElemContent
                className="z-50"
            >
                <div
                    ref={ref}
                    className={'min-w-[120px] p-1 bg-white rounded-lg border border--gray-200 shadow-lg'}
                    onMouseEnter={setIsHovering}
                    onMouseLeave={setNotHovering}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <div className={cn(s.actionItem, 'hover:bg-gray-50 group')} onClick={togglePin}>
                        <Pin02 className='shrink-0 w-4 h-4 text-gray-500' />
                        <span className={s.actionName}>{isPinned ? 'Unpin' : 'Pin'}</span>
                    </div>
                    {isShowRenameConversation && (
                        <div className={cn(s.actionItem, 'hover:bg-gray-50 group')} onClick={onRenameConversation}>
                            <Edit03 className='shrink-0 w-4 h-4 text-gray-500' />
                            <span className={s.actionName}>{'Rename'}</span>
                        </div>
                    )}
                    {isShowDelete && (
                        <div className={cn(s.actionItem, s.deleteActionItem, 'hover:bg-gray-50 group')} onClick={onDelete} >
                            <Trash03 className={cn(s.deleteActionItemChild, 'shrink-0 w-4 h-4 stroke-current text-gray-500 stroke-2')} />
                            <span className={cn(s.actionName, s.deleteActionItemChild)}>{'Delete'}</span>
                        </div>
                    )}
                </div>
            </PortalToFollowElemContent>
        </PortalToFollowElem>
    )
}
export default React.memo(ItemOperation)
