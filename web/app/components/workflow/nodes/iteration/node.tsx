import type { FC } from 'react'
import {
  memo,
  useEffect,
} from 'react'
import {
  Background,
  useNodesInitialized,
  useViewport,
} from 'reactflow'
import cn from 'classnames'
import { useNodeIterationInteractions } from './use-interactions'
import type { IterationNodeType } from './types'
import AddBlock from './add-block'
import type { NodeProps } from '@/app/components/workflow/types'
import { getDarkThemeClasses } from '@/app/theme'
const Node: FC<NodeProps<IterationNodeType>> = ({
  id,
  data,
}) => {
  const { zoom } = useViewport()
  const nodesInitialized = useNodesInitialized()
  const { handleNodeIterationRerender } = useNodeIterationInteractions()

  useEffect(() => {
    if (nodesInitialized)
      handleNodeIterationRerender(id)
  }, [nodesInitialized, id, handleNodeIterationRerender])

  return (
    // <div className={cn(
    //   'relative min-w-[258px] min-h-[118px] w-full h-full rounded-2xl bg-[#F0F2F7]/90',
    // )}>
    // <div className={cn(
    //   'relative min-w-[258px] min-h-[118px] w-full h-full rounded-2xl bg-[#F0F2F7]/90 dark:bg-[#383838]',
    // )}>
    <div className={cn(
      `relative min-w-[258px] min-h-[118px] w-full h-full rounded-2xl bg-[#F0F2F7]/90 ${getDarkThemeClasses('background3')}`,
    )}>
      <Background
        id={`iteration-background-${id}`}
        className='rounded-2xl !z-0'
        gap={[14 / zoom, 14 / zoom]}
        size={2 / zoom}
        color='#E4E5E7'
      />
      <AddBlock
        iterationNodeId={id}
        iterationNodeData={data}
      />
    </div>
  )
}

export default memo(Node)
