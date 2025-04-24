import { createContext, useContext, useId } from 'react'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import type {
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

import type {
  ControllerProps,
  ControllerFieldState,
} from '../shared/controller'
import { FieldArray } from '../shared/field-array'
import type { UseFormStateReturn } from '../shared/useFormState'
import { useController } from '../shared/useController'

const Form = (props: React.ComponentProps<'form'>) => <form {...props} />

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const states = useController<TFieldValues, TName>(props)
  return (
    <FormFieldContext.Provider value={states}>
      {props.render(states)}
    </FormFieldContext.Provider>
  )
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    ...fieldContext,
    field: {
      ...fieldContext.field,
      id,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
    },
  }
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { field, fieldState } = useFormField()
  return (
    <Label
      data-slot="form-label"
      data-error={!!fieldState.error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={field.formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { field, fieldState } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={field.formItemId}
      aria-describedby={
        !fieldState.error
          ? `${field.formDescriptionId}`
          : `${field.formDescriptionId} ${field.formMessageId}`
      }
      aria-invalid={!!fieldState.error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { field } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={field.formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { field, fieldState } = useFormField()
  const body = fieldState.error
    ? String(fieldState.error?.message ?? '')
    : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={field.formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

Form.Field = FormField
Form.Item = FormItem
Form.Label = FormLabel
Form.Control = FormControl
Form.Description = FormDescription
Form.Message = FormMessage
Form.FieldArray = FieldArray

export { Form }
