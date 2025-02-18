'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import classNames from 'classnames'
import type { INavSelectorProps } from './nav-selector'
import NavSelector from './nav-selector'
import { ArrowNarrowLeft } from '@/app/components/base/icons/src/vender/line/arrows'
import { useStore as useAppStore } from '@/app/components/app/store'
import { getDarkThemeClasses } from '@/app/theme'
type INavProps = {
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  text: string
  activeSegment: string | string[]
  link: string
  isApp: boolean
  // collapsed:boolean
  collapsed:boolean
} & INavSelectorProps

const Nav = ({
  icon,
  activeIcon,
  text,
  activeSegment,
  link,
  curNav,
  navs,
  createText,
  onCreate,
  onLoadmore,
  // collapsed,
  collapsed,
  isApp,
}: INavProps) => {
  const setAppDetail = useAppStore(state => state.setAppDetail)
  const [hovered, setHovered] = useState(false)
  const segment = useSelectedLayoutSegment()
  const isActived = Array.isArray(activeSegment) ? activeSegment.includes(segment!) : segment === activeSegment
  const itemClassName = `
    flex items-center mb-1 w-full h-9 px-1 text-gray-700 text-[14px]
    rounded-lg font-normal hover:bg-gray-50 cursor-pointer text-wrap: nowrap ${getDarkThemeClasses('hover')} cursor-pointer ${getDarkThemeClasses('text')}
  `
  return (
    // <div className={`
    //   flex items-center h-8 mr-0 sm:mr-3 px-0.5 rounded-xl text-sm shrink-0 font-medium
    //   ${isActived && 'bg-white shadow-md font-semibold'}
    //   ${!curNav && !isActived && 'hover:bg-gray-200'}
    // `}>
    <div className={`${itemClassName}
     
      ${isActived && `bg-white ${getDarkThemeClasses('lab_activatedbutton')}`}
      ${!curNav && !isActived && 'hover:bg-gray-200'}
    `}>
      <Link href={link}>
        <div
          onClick={() => setAppDetail()}
          // className={classNames(`
          //   flex items-center h-7 px-2.5 cursor-pointer rounded-[10px]
          //   ${isActived ? 'text-primary-600' : 'text-gray-500'}
          //   ${curNav && isActived && 'hover:bg-primary-50'}
          // className={classNames(`
          //   flex items-center h-7 px-2.5 cursor-pointer rounded-[10px] dark:hover:bg-zinc-800 cursor-pointer dark:text-white 
          //   ${isActived ? 'text-primary-600 dark:!text-primary-600' : 'text-gray-500'}
          //   ${curNav && isActived ? 'hover:bg-primary-50' : ''}
          // `)}
          className={classNames(`
            flex items-center h-7 px-2.5 cursor-pointer rounded-[10px] ${getDarkThemeClasses('hover')} cursor-pointer  
            ${isActived ? `text-primary-600 ${getDarkThemeClasses('green_text')} ` : `text-gray-500 ${getDarkThemeClasses('text')}`}
            ${curNav && isActived ? 'hover:bg-primary-50' : ''}
          `)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
           {/* <div className='mr-2'>
            {
              (hovered && curNav)
                ? <ArrowNarrowLeft className='w-4 h-4' />
                : isActived
                  ? activeIcon
                  : icon
            }
          </div>  */}
           <div className='mr-2'>
            {
              (hovered && curNav)
                ? <ArrowNarrowLeft className='w-4 h-4' />
                : isActived
                  ? activeIcon
                  : icon
            }
          </div>
          {text}
        </div>
      </Link>
      {
        //  curNav && isActived &&(
       curNav && isActived && !collapsed &&(
          <>
            <div className='font-light text-gray-300 '> /</div>
            <NavSelector
              isApp={isApp}
              curNav={curNav}
              navs={navs}
              createText={createText}
              onCreate={onCreate}
              onLoadmore={onLoadmore}
            />
          </>
        )
      }
    </div>
  )
}

export default Nav
