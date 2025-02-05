'use client'

import type { FC } from 'react'
import { useContext } from 'use-context-selector'
import TemplateEn from './template/template.en.mdx'
import TemplateZh from './template/template.zh.mdx'
import I18n from '@/context/i18n'
import { LanguagesSupported } from '@/i18n/language'
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'
=======

>>>>>>> origin/rupa
type DocProps = {
  apiBaseUrl: string
}
const Doc: FC<DocProps> = ({
  apiBaseUrl,
}) => {
  const { locale } = useContext(I18n)
  return (
    // <article className='mx-1 px-4 sm:mx-12 pt-16 bg-white rounded-t-xl prose prose-xl'>
<<<<<<< HEAD
      <article className={`mx-1 px-4 sm:mx-12 pt-16 bg-white rounded-t-xl prose prose-xl ${getDarkThemeClasses('background')}`}>
=======
      <article className='mx-1 px-4 sm:mx-12 pt-16 bg-white rounded-t-xl prose prose-xl dark:bg-[#202020] dark:prose-h1:text-white dark:prose-h3:text-white dark:prose-p:text-[#FCFCFC]'>
>>>>>>> origin/rupa
      {
        locale !== LanguagesSupported[1]
          ? <TemplateEn apiBaseUrl={apiBaseUrl} />
          : <TemplateZh apiBaseUrl={apiBaseUrl} />
      }
    </article>
  )
}

export default Doc
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
