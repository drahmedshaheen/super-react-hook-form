import { useMemo } from 'react'
import { useController as _useController } from 'react-hook-form'
import type {
  FieldValues,
  FieldPath,
  ControllerFieldState,
  UseControllerProps as _UseControllerProps,
} from 'react-hook-form'
import type { BehaviorSubject } from 'rxjs'

import { createNestedObject, stringToPath, get } from '../utils/object'

import { useFormState, type FormState } from './useFormState'

export type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<_UseControllerProps<TFieldValues, TName>, 'control'> & {
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

  const modifiedField = { ...field, onChange, onBlur }
  const modifiedFormState = useFormState({ name: field.name, formState$ })
  const modifiedFieldState = useMemo(
    () =>
      Object.defineProperties(
        {},
        {
          ...Object.getOwnPropertyDescriptors(fieldState),
          isTyping: {
            enumerable: true,
            get: () => get(modifiedFormState.typingFields, field.name),
          },
        },
      ) as ControllerFieldState & { isTyping: boolean },
    [modifiedFormState, fieldState, field.name],
  )

  function onChange(...event: any[]) {
    const typingFields = createNestedObject(stringToPath(field.name), true)

    formState$.next({ ...formState$.getValue(), isTyping: true, typingFields })
    return field.onChange(...event)
  }

  function onBlur() {
    formState$.next({
      ...formState$.getValue(),
      isTyping: false,
      typingFields: {},
    })
    return field.onBlur()
  }

  return {
    field: modifiedField,
    fieldState: modifiedFieldState,
    formState: modifiedFormState,
  }
}
