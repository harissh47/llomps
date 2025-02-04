import {
  memo,
  useCallback,
  useState,
} from 'react'
import Textarea from 'rc-textarea'
import { useTranslation } from 'react-i18next'
import { getDarkThemeClasses } from '@/utils/theme'
type TitleInputProps = {
  value: string
  onBlur: (value: string) => void
}

export const TitleInput = memo(({
  value,
  onBlur,
}: TitleInputProps) => {
  const { t } = useTranslation()
  const [localValue, setLocalValue] = useState(value)

  const handleBlur = () => {
    if (!localValue) {
      setLocalValue(value)
      onBlur(value)
      return
    }

    onBlur(localValue)
  }

  return (
    <input
      value={localValue}
      onChange={e => setLocalValue(e.target.value)}
      // className={`
      //   grow mr-2 px-1 h-6 text-base text-gray-900 font-semibold rounded-lg border border-transparent appearance-none outline-none
      //   hover:bg-gray-50 
      //   focus:border-gray-300 focus:shadow-xs focus:bg-white caret-[#295EFF]
      // `}
      className={`
      grow mr-2 px-1 h-6 text-base text-gray-900 ${getDarkThemeClasses('text')} font-semibold rounded-lg border border-transparent  appearance-none outline-none
        hover:bg-gray-50 ${getDarkThemeClasses('hover')} ${getDarkThemeClasses('background1')}
        focus:border-gray-300 ${getDarkThemeClasses('borderfocus')} focus:shadow-xs focus:bg-white caret-[#295EFF] ${getDarkThemeClasses('focus1')}

         `}
      placeholder={t('workflow.common.addTitle') || ''}
      onBlur={handleBlur}
    />
  )
})
TitleInput.displayName = 'TitleInput'

type DescriptionInputProps = {
  value: string
  onChange: (value: string) => void
}
export const DescriptionInput = memo(({
  value,
  onChange,
}: DescriptionInputProps) => {
  const { t } = useTranslation()
  const [focus, setFocus] = useState(false)
  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])
  const handleBlur = useCallback(() => {
    setFocus(false)
  }, [])

  return (
    <div
      // className={`
      //   group flex px-2 py-[5px] max-h-[60px] rounded-lg overflow-y-auto
      //   border border-transparent hover:bg-gray-50 leading-0
      //   ${focus && '!border-gray-300 shadow-xs !bg-gray-50'}
      // `}
      className={`
        group flex px-2 py-[5px] max-h-[60px] rounded-lg overflow-y-auto
        border border-transparent hover:bg-gray-50 ${getDarkThemeClasses('hover')} leading-0
        ${focus && `!border-gray-300 ${getDarkThemeClasses('border')} shadow-xs !bg-gray-50 ${getDarkThemeClasses('hover')}`}
      `}
    >
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          // w-full text-xs text-gray-900 leading-[18px] bg-transparent
          // appearance-none outline-none resize-none
          // placeholder:text-gray-400 caret-[#295EFF]
          w-full text-xs text-gray-900  ${getDarkThemeClasses('sub_text1')} leading-[18px] bg-transparent
          appearance-none outline-none resize-none
          placeholder:text-gray-400 ${getDarkThemeClasses('placeholder1')} caret-[#295EFF] ${getDarkThemeClasses('caret')}
        `}
        placeholder={t('workflow.common.addDescription') || ''}
        autoSize
      />
    </div>
  )
})
DescriptionInput.displayName = 'DescriptionInput'
