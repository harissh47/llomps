import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import RemoveEffectVarConfirm from '../_base/components/remove-effect-var-confirm'
import VarList from './components/var-list'
import VarItem from './components/var-item'
import useConfig from './use-config'
import type { StartNodeType } from './types'
import Split from '@/app/components/workflow/nodes/_base/components/split'
import Field from '@/app/components/workflow/nodes/_base/components/field'
import AddButton from '@/app/components/base/button/add-button'
import ConfigVarModal from '@/app/components/app/configuration/config-var/config-modal'
import type { InputVar, NodePanelProps } from '@/app/components/workflow/types'
import { getDarkThemeClasses } from '@/app/theme'
const i18nPrefix = 'workflow.nodes.start'

const Panel: FC<NodePanelProps<StartNodeType>> = ({
  id,
  data,
}) => {
  const { t } = useTranslation()
  const {
    readOnly,
    isChatMode,
    inputs,
    isShowAddVarModal,
    showAddVarModal,
    handleAddVariable,
    hideAddVarModal,
    handleVarListChange,
    handleFieldVisibility,
    isShowRemoveVarConfirm,
    hideRemoveVarConfirm,
    onRemoveVarConfirm,
  } = useConfig(id, data)

  const handleAddVarConfirm = (payload: InputVar) => {
    handleAddVariable(payload)
    hideAddVarModal()
  }

  return (
    <div className='mt-2'>
      <div className='px-4 pb-2 space-y-4'>
        <Field
          title={t(`${i18nPrefix}.inputField`)}
          operations={
            !readOnly ? <AddButton onClick={showAddVarModal} /> : undefined
          }
        >
          <>
            <VarList
              readonly={readOnly}
              list={inputs.variables || []}
              onChange={handleVarListChange}
              fieldVisibility={inputs.field_visibility}
              handleFieldVisibility={handleFieldVisibility}
            />

            <div className='mt-1 space-y-1'>
              <Split className='my-2' />
              {
                isChatMode && (
                  <VarItem
                    readonly
                    payload={{
                      variable: 'sys.query',
                    } as any}
                    rightContent={
                      // <div className='text-xs font-normal text-gray-500'>
                      <div className={`text-xs font-normal text-gray-500 ${getDarkThemeClasses('sub_text1')}`}>
                        String
                      </div>
                    }
                  />)
              }

              <VarItem
                readonly
                payload={{
                  variable: 'sys.files',
                } as any}
                rightContent={
                  // <div className='text-xs font-normal text-gray-500'>
                  <div className={`text-xs font-normal text-gray-500 ${getDarkThemeClasses('sub_text1')}`}>
                    Array[File]
                  </div>
                }
              />
              {
                isChatMode && (
                  <VarItem
                    readonly
                    payload={{
                      variable: 'sys.conversation_id',
                    } as any}
                    rightContent={
                      // <div className='text-xs font-normal text-gray-500'>
                      <div className={`text-xs font-normal text-gray-500 ${getDarkThemeClasses('sub_text1')}`}>
                        String
                      </div>
                    }
                  />
                )
              }
              {
                isChatMode && (
                  <VarItem
                    readonly
                    payload={{
                      variable: 'sys.memory',
                    } as any}
                    rightContent={
                      // <div className='text-xs font-normal text-gray-500'>
                      <div className={`text-xs font-normal text-gray-500 ${getDarkThemeClasses('sub_text1')}`}>
                        Object
                      </div>
                    }
                  />
                )
              }
              <VarItem
                readonly
                payload={{
                  variable: 'sys.user_id',
                } as any}
                rightContent={
                  // <div className='text-xs font-normal text-gray-500'>
                  <div className={`text-xs font-normal text-gray-500 ${getDarkThemeClasses('sub_text1')}`}>
                    String
                  </div>
                }
              />
            </div>

          </>
        </Field>
      </div>

      {isShowAddVarModal && (
        <ConfigVarModal
          isCreate
          isShow={isShowAddVarModal}
          onClose={hideAddVarModal}
          onConfirm={handleAddVarConfirm}
          varKeys={inputs.variables.map(v => v.variable)}
        />
      )}

      <RemoveEffectVarConfirm
        isShow={isShowRemoveVarConfirm}
        onCancel={hideRemoveVarConfirm}
        onConfirm={onRemoveVarConfirm}
      />
    </div>
  )
}

export default React.memo(Panel)
