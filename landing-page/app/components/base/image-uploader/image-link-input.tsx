import type { FC } from 'react'
import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
import type { ImageFile } from '@/types/app'
import { TransferMethod } from '@/types/app'

type ImageLinkInputProps = {
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
}
const regex = /^(https?|ftp):\/\//
const ImageLinkInput: FC<ImageLinkInputProps> = ({
  onUpload,
  disabled,
}) => {
  // const { t } = useTranslation()
  const [imageLink, setImageLink] = useState('')

  const handleClick = () => {
    if (disabled)
      return

    const imageFile = {
      type: TransferMethod.remote_url,
      _id: `${Date.now()}`,
      fileId: '',
      progress: regex.test(imageLink) ? 0 : -1,
      url: imageLink,
    }

    onUpload(imageFile)
  }

  return (
    <div className='flex items-center pl-1.5 pr-1 h-8 border border-gray-200 bg-white shadow-xs rounded-lg'>
      <input
        type="text"
        className='grow mr-0.5 px-1 h-[18px] text-[13px] outline-none appearance-none'
        value={imageLink}
        onChange={e => setImageLink(e.target.value)}
        placeholder={'Paste image link here'}
      />
      <Button
        type='primary'
        className='!h-6 text-xs font-medium'
        disabled={!imageLink || disabled}
        onClick={handleClick}
      >
        {'OK'}
      </Button>
    </div>
  )
}

export default ImageLinkInput
