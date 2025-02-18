import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
// https://headlessui.com/react/dialog
import { getDarkThemeClasses } from '@/app/theme'
 
type IModal = {
  className?: string
  wrapperClassName?: string
  isShow: boolean
  onClose?: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  closable?: boolean
  overflowVisible?: boolean
}
 
export default function Modal({
  className,
  wrapperClassName,
  isShow,
  onClose = () => { },
  title,
  description,
  children,
  closable = false,
  overflowVisible = false,
}: IModal) {
  return (
    <Transition appear show={isShow} as={Fragment}>
      <Dialog as="div" className={classNames('modal-dialog', wrapperClassName)} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
 
        <div
          className="fixed inset-0 overflow-y-auto"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {/* <div className="flex min-h-full items-center justify-center p-4 text-center"> */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={classNames(
                'modal-panel',
                // overflowVisible ? 'overflow-visible' : 'overflow-hidden ',
                // overflowVisible ? 'overflow-visible dark:bg-[#3e3e3e]' : 'overflow-hidden dark:bg-[#3e3e3e]',
                overflowVisible ? `overflow-visible ${getDarkThemeClasses('background1')}` : `overflow-hidden ${getDarkThemeClasses('background1')}`,
 
                className,
              )}>
                {title && <Dialog.Title
                  as="h3"
                  // className="text-lg font-medium leading-6 text-gray-900"
                  // className="text-lg font-medium leading-6 text-gray-900 dark:bg-[#3e3e3e] dark:text-white"
                    className={`text-lg font-medium leading-6 text-gray-900 ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')}`}
                >
                  {title}
                </Dialog.Title>}
                {description && <Dialog.Description className='text-gray-500 text-xs font-normal mt-2'>
                  {description}
                </Dialog.Description>}
                {closable
                  &&
                  // <div className='absolute z-10 top-6 right-6 w-5 h-5 rounded-2xl flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800'>
                  <div className={`absolute z-10 top-6 right-6 w-5 h-5 rounded-2xl flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 ${getDarkThemeClasses('hover')}`}>
                    <XMarkIcon className='w-4 h-4 text-gray-500 ' onClick={
                      (e) => {
                        e.stopPropagation()
                        onClose()
                      }
                    } />
                  </div>}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}