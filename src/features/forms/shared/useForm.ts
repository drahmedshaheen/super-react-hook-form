import { useEffect } from 'react'
import { useForm as _useForm } from 'react-hook-form'
import type { BehaviorSubject } from 'rxjs'
import type {
  UseFormProps as _UseFormProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import type { FormState } from './useFormState'

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = _UseFormProps<TFieldValues, TContext, TTransformedValues> & {
  formState$: BehaviorSubject<FormState<TFieldValues>>
}

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  formState$,
  ...props
}: UseFormProps<TFieldValues, TContext, TTransformedValues>): UseFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> => {
  const formControl = _useForm<TFieldValues, TContext, TTransformedValues>({
    resetOptions: {
      keepDirtyValues: true,
      keepDefaultValues: true,
    },
    ...props,
  })

  useEffect(() => {
    const unsubscribe = formControl.subscribe({
      formState: {
        touchedFields: true,
        values: true,
        errors: true,
        isDirty: true,
        dirtyFields: true,
        isValid: true,
        isValidating: true,
        validatingFields: true,
      },
      callback: (payload) =>
        formState$.next({ ...formState$.getValue(), ...payload }),
    })

    return () => unsubscribe()
  }, [formControl.subscribe, formState$])

  return formControl
}
