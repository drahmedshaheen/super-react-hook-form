import { useCallback, useMemo } from 'react'
import { useController as _useController } from 'react-hook-form'
import type {
  FieldValues,
  FieldPath,
  ControllerFieldState as _ControllerFieldState,
  UseControllerProps as _UseControllerProps,
} from 'react-hook-form'
import type { BehaviorSubject } from 'rxjs'

import { createNestedObject, stringToPath, getValue } from '../utils/object'

import { useFormState, type FormState } from './useFormState'

export type ControllerFieldState = _ControllerFieldState & {
  isTyping: boolean
}

export type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = _UseControllerProps<TFieldValues, TName> & {
  formState$: BehaviorSubject<FormState<TFieldValues>>
}

export const useController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formState$,
  ...props
}: UseControllerProps<TFieldValues, TName>) => {
  const { field, fieldState } = _useController({
    ...props,
  } satisfies _UseControllerProps<TFieldValues, TName>)

  const modifiedFormState = useFormState({ name: field.name, formState$ })
  const modifiedFieldState = useMemo(
    () =>
      Object.defineProperties(
        {},
        {
          ...Object.getOwnPropertyDescriptors(fieldState),
          isTyping: {
            enumerable: true,
            get: () => getValue(modifiedFormState.typingFields, field.name),
          },
        },
      ) as ControllerFieldState,
    [modifiedFormState, fieldState, field.name],
  )

  const onChange = useCallback(
    (...event: any[]) => {
      const typingFields = createNestedObject(stringToPath(field.name), true)

      formState$.next({
        ...formState$.getValue(),
        isTyping: true,
        typingFields,
      })
      return field.onChange(...event)
    },
    [field.name, field.onChange, formState$],
  )

  const onBlur = useCallback(() => {
    formState$.next({
      ...formState$.getValue(),
      isTyping: false,
      typingFields: {},
    })
    return field.onBlur()
  }, [field.onBlur, formState$])

  return useMemo(
    () => ({
      field: { ...field, onChange, onBlur },
      fieldState: modifiedFieldState,
      formState: modifiedFormState,
    }),
    [field, onChange, onBlur, modifiedFieldState, modifiedFormState],
  )
}
