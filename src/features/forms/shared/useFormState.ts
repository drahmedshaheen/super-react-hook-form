import { useObservableState } from 'observable-hooks'
import { distinctUntilChanged } from 'rxjs/operators'
import type {
  FieldValues,
  UseFormStateProps as _UseFormStateProps,
  FieldNamesMarkedBoolean,
  FormState as _FormState,
} from 'react-hook-form'
import type { BehaviorSubject } from 'rxjs'

import { shallow } from '../utils/shallow'
import { getValue } from '../utils/object'

export type FormState<TFieldValues extends FieldValues> =
  _FormState<TFieldValues> & {
    values: TFieldValues
    isTyping: boolean
    typingFields?: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
  }

export type useFormStateProps<TFieldValues extends FieldValues = FieldValues> =
  {
    formState$: BehaviorSubject<FormState<TFieldValues>>
  } & Pick<_UseFormStateProps<TFieldValues>, 'name'>

export type UseFormStateReturn<TFieldValues extends FieldValues> =
  FormState<TFieldValues>

export const useFormState = <TFieldValues extends FieldValues = FieldValues>({
  name,
  formState$,
}: useFormStateProps<TFieldValues>): UseFormStateReturn<TFieldValues> =>
  useObservableState(
    formState$.pipe(
      distinctUntilChanged((previous, current) => {
        return shallow(
          { typingFields: getValue(previous, `typingFields.${name}`) },
          { typingFields: getValue(current, `typingFields.${name}`) },
        )
      }),
    ),
    formState$.getValue(),
  )
