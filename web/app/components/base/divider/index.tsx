import type { CSSProperties, FC } from 'react'
import React from 'react'
import s from './style.module.css'
import { getDarkThemeClasses } from '@/app/theme'
type Props = {
  type?: 'horizontal' | 'vertical'
  // orientation?: 'left' | 'right' | 'center'
  className?: string
  style?: CSSProperties
}

const Divider: FC<Props> = ({ type = 'horizontal', className = '', style }) => {
  return (
    // <div className={`${s.divider} ${s[type]} ${className}`} style={style}></div>
    <div className={`${`bg-gray-200 ${getDarkThemeClasses('background3')}`} ${s[type]} ${className}`} style={style}></div>

  )
}

export default Divider
