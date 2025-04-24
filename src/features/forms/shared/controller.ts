import type {
  FieldValues,
  FieldPath,
  ControllerRenderProps,
} from 'react-hook-form'

import {
  useController,
  type UseControllerProps,
  type ControllerFieldState,
} from './useController'
import type { UseFormStateReturn } from './useFormState'

export type ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactElement
} & UseControllerProps<TFieldValues, TName>

// TODO Create controller that allow multi names as array so you can modify multi fields at same time useful for combobox
export const Controller = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => props.render(useController<TFieldValues, TName>(props))
