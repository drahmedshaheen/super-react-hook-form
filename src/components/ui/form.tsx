import { createContext, useContext, useId, useMemo } from 'react'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import type { FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

import type { ControllerProps } from '@/features/forms/shared/controller'
import type { ControllerFieldState } from '@/features/forms/shared/useController'
import { FieldArray } from '@/features/forms/shared/field-array'
import { useController } from '@/features/forms/shared/useController'

const Form = (props: React.ComponentProps<'form'>) => <form {...props} />

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  fieldState: ControllerFieldState
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
    <FormFieldContext.Provider
      value={{ name: props.name, fieldState: states.fieldState }}
    >
      {props.render(states)}
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  const ids = useMemo(
    () => ({
      id,
      name: fieldContext.name,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
    }),
    [id, fieldContext.name],
  )

  return useMemo(
    () =>
      Object.defineProperties(
        {},
        {
          ...Object.getOwnPropertyDescriptors(fieldContext.fieldState),
          ...Object.fromEntries(
            Object.entries(ids).map(([key, value]) => [
              key,
              {
                value,
                writable: true,
                enumerable: true,
                configurable: true,
              },
            ]),
          ),
        },
      ) as ControllerFieldState & typeof ids,
    [ids, fieldContext.fieldState],
  )
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

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

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
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
