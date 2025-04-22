import type {
  FieldValues,
  FieldArrayPath,
  UseFieldArraySwap,
  UseFieldArrayMove,
  UseFieldArrayPrepend,
  UseFieldArrayAppend,
  FieldArrayWithId,
  UseFieldArrayInsert,
  UseFieldArrayRemove,
  UseFieldArrayReplace,
  UseFieldArrayUpdate,
} from 'react-hook-form'

import { useFieldArray, type UseFieldArrayProps } from './useFieldArray'

export type FieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = {
  render: ({
    swap,
    move,
    prepend,
    append,
    remove,
    insert,
    update,
    replace,
    fields,
  }: {
    swap: UseFieldArraySwap
    move: UseFieldArrayMove
    prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>
    append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>
    remove: UseFieldArrayRemove
    insert: UseFieldArrayInsert<TFieldValues, TFieldArrayName>
    update: UseFieldArrayUpdate<TFieldValues, TFieldArrayName>
    replace: UseFieldArrayReplace<TFieldValues, TFieldArrayName>
    fields: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>[]
  }) => React.ReactElement
} & UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>

// TODO render children as collection where each element has its id and index in react fragment
export const FieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
>(
  props: FieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>,
) => props.render(useFieldArray<TFieldValues, TFieldArrayName, TKeyName>(props))
