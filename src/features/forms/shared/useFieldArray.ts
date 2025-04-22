import {
  useFieldArray as _useFieldArray,
  useFormContext,
} from 'react-hook-form'
import type {
  FieldValues,
  FieldArrayPath,
  UseFieldArrayProps as _UseFieldArrayProps,
  UseFieldArrayReturn,
} from 'react-hook-form'

export type UseFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = _UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>

export const useFieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
>(
  props: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>,
): UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName> => {
  return _useFieldArray(props)
}
