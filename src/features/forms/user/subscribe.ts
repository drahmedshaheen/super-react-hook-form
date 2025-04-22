import { BehaviorSubject } from 'rxjs'
import { map, pairwise } from 'rxjs/operators'

import type { UserFormInput } from './schema'
import type { FormState } from '../shared/useFormState'

export const formState$ = new BehaviorSubject<FormState<UserFormInput>>({
  values: {} as any,
  submitCount: 0,
  isDirty: false,
  isLoading: false,
  isValidating: false,
  isSubmitted: false,
  isSubmitting: false,
  isSubmitSuccessful: false,
  isValid: false,
  touchedFields: {},
  dirtyFields: {},
  validatingFields: {},
  errors: {},
  disabled: false,
  isTyping: false,
  typingFields: {},
})

// Create an observable that emits distinct form state changes
export const formChanges$ = formState$.pipe(
  pairwise(),
  map(([previous, current]) => ({ previous, current })),
  map((formState) => {
    // console.log("Form state updated:", formState)
    return formState
  }),
)
