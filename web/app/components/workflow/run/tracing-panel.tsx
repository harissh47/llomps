'use client'
import type { FC } from 'react'
import NodePanel from './node'
import type { NodeTracing } from '@/types/workflow'
import { getDarkThemeClasses } from '@/app/theme'
type TracingPanelProps = {
  list: NodeTracing[]
  onShowIterationDetail: (detail: NodeTracing[][]) => void
}

const TracingPanel: FC<TracingPanelProps> = ({ list, onShowIterationDetail }) => {
  return (
    // <div className='bg-gray-50 py-2'>
    <div className={`bg-gray-50 ${getDarkThemeClasses('background1')} py-2`}>
      {list.map(node => (
        <NodePanel
          key={node.id}
          nodeInfo={node}
          onShowIterationDetail={onShowIterationDetail}
          justShowIterationNavArrow
        />
      ))}
    </div>
  )
}

export default TracingPanel
