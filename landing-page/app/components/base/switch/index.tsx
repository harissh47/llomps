'use client'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Switch as OriginalSwitch } from '@headlessui/react'

type SwitchProps = {
  onChange?: (value: boolean) => void
  size?: 'sm' | 'md' | 'lg' | 'l'
  defaultValue?: boolean
  disabled?: boolean
  className?: string
  checked?: boolean
}

const Switch = ({ onChange, size = 'lg', defaultValue = false, disabled = false, className }: SwitchProps) => {
  const [enabled, setEnabled] = useState(defaultValue)
  useEffect(() => {
    setEnabled(defaultValue)
  }, [defaultValue])
  const wrapStyle = {
    lg: 'h-6 w-11',
    l: 'h-5 w-9',
    md: 'h-4 w-7',
    sm: 'h-3 w-5',
  }

  const circleStyle = {
    lg: 'h-5 w-5',
    l: 'h-4 w-4',
    md: 'h-3 w-3',
    sm: 'h-2 w-2',
  }

  const translateLeft = {
    lg: 'translate-x-5',
    l: 'translate-x-4',
    md: 'translate-x-3',
    sm: 'translate-x-2',
  }
  return (
    <OriginalSwitch
      checked={enabled}
      onChange={(checked: boolean) => {
        if (disabled)
          return
        setEnabled(checked)
        onChange?.(checked)
      }}
      className={classNames(
        wrapStyle[size],
        enabled ? 'bg-blue-600' : 'bg-gray-200',
        'relative inline-flex  flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        disabled ? '!opacity-50 !cursor-not-allowed' : '',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          circleStyle[size],
          enabled ? translateLeft[size] : 'translate-x-0',
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </OriginalSwitch>
  )
}
export default React.memo(Switch)
