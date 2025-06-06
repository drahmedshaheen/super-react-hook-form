import { control } from '@/features/forms/user'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Card, Select, Badge, Input, Popover } from '@/components/ui'
import { Button, Calendar, RadioGroup, Form } from '@/components/ui'
import { formState$ } from '@/features/forms/user/subscribe'
import { age, fullName, isAge, isPersonalCompleted } from './signals'
import { useFormState } from '@/features/forms/shared/useFormState'

export default function PersonalInfoForm() {
  return (
    <div className="space-y-8">
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Basic Information</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          <Form.Field
            control={control}
            formState$={formState$}
            name="firstName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>First Name</Form.Label>
                <Form.Control>
                  <Input placeholder="John" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="lastName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Last Name</Form.Label>
                <Form.Control>
                  <Input placeholder="Doe" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Email Address</Form.Label>
                <Form.Control>
                  <Input placeholder="john.doe@example.com" {...field} />
                </Form.Control>
                <Form.Description>
                  We'll never share your email with anyone else.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="phone"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="dateOfBirth"
            render={({ field }) => (
              <Form.Item className="flex flex-col">
                <Form.Label>Date of Birth</Form.Label>
                <Popover>
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="w-auto p-0" align="start">
                    <Calendar
                      autoFocus
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                    />
                  </Popover.Content>
                </Popover>
                <Form.Message />
              </Form.Item>
            )}
          />

          {/* Computed field: Age */}
          <AgeField />

          <Form.Field
            control={control}
            formState$={formState$}
            name="gender"
            render={({ field }) => (
              <Form.Item className="space-y-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    className="flex flex-col space-y-1"
                  >
                    <Form.Item className="flex items-center space-x-3 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="male" />
                      </Form.Control>
                      <Form.Label className="font-normal">Male</Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-3 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="female" />
                      </Form.Control>
                      <Form.Label className="font-normal">Female</Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-3 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="nonBinary" />
                      </Form.Control>
                      <Form.Label className="font-normal">
                        Non-binary
                      </Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-3 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="preferNotToSay" />
                      </Form.Control>
                      <Form.Label className="font-normal">
                        Prefer not to say
                      </Form.Label>
                    </Form.Item>
                  </RadioGroup>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          {/* Computed field: Full Name */}
          <FullNameField />
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Address & Identification</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          <Form.Field
            control={control}
            formState$={formState$}
            name="address.street"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Street Address</Form.Label>
                <Form.Control>
                  <Input placeholder="123 Main St" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="address.city"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>City</Form.Label>
                <Form.Control>
                  <Input placeholder="Anytown" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="address.state"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>State/Province</Form.Label>
                <Form.Control>
                  <Input placeholder="CA" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="address.zipCode"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Zip/Postal Code</Form.Label>
                <Form.Control>
                  <Input placeholder="12345" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="address.country"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Country</Form.Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <Form.Control>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your country" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item value="usa">United States</Select.Item>
                    <Select.Item value="canada">Canada</Select.Item>
                    <Select.Item value="uk">United Kingdom</Select.Item>
                    <Select.Item value="australia">Australia</Select.Item>
                    <Select.Item value="germany">Germany</Select.Item>
                    <Select.Item value="france">France</Select.Item>
                    <Select.Item value="japan">Japan</Select.Item>
                    <Select.Item value="china">China</Select.Item>
                    <Select.Item value="india">India</Select.Item>
                    <Select.Item value="brazil">Brazil</Select.Item>
                    <Select.Item value="other">Other</Select.Item>
                  </Select.Content>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="citizenship"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Citizenship</Form.Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <Form.Control>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your citizenship" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item value="usa">United States</Select.Item>
                    <Select.Item value="canada">Canada</Select.Item>
                    <Select.Item value="uk">United Kingdom</Select.Item>
                    <Select.Item value="australia">Australia</Select.Item>
                    <Select.Item value="germany">Germany</Select.Item>
                    <Select.Item value="france">France</Select.Item>
                    <Select.Item value="japan">Japan</Select.Item>
                    <Select.Item value="china">China</Select.Item>
                    <Select.Item value="india">India</Select.Item>
                    <Select.Item value="brazil">Brazil</Select.Item>
                    <Select.Item value="dual">Dual Citizenship</Select.Item>
                    <Select.Item value="other">Other</Select.Item>
                  </Select.Content>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="identificationNumber"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>ID Number (Passport/National ID)</Form.Label>
                <Form.Control>
                  <Input placeholder="AB123456" {...field} />
                </Form.Control>
                <Form.Description>
                  Passport, driver's license, or other government-issued ID
                </Form.Description>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Card.Content>
      </Card>

      {/* Profile completion indicator - computed field */}
      <Indicator />
    </div>
  )
}

function AgeField() {
  return (
    <Form.Item>
      <Form.Label>Age</Form.Label>
      <Form.Control>
        <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
          {isAge.value ? (
            <span>{age} years old</span>
          ) : (
            <span className="text-muted-foreground">Enter date of birth</span>
          )}
        </div>
      </Form.Control>
      <Form.Description>
        Automatically calculated from your date of birth
      </Form.Description>
    </Form.Item>
  )
}

function FullNameField() {
  const {
    values: { firstName },
    isTyping: firstNameTyping,
  } = useFormState({
    name: 'firstName',
    formState$,
  })

  const {
    values: { lastName },
    isTyping: lastNameTyping,
  } = useFormState({
    name: 'lastName',
    formState$,
  })

  return (
    <Form.Item>
      <Form.Label>Full Name</Form.Label>
      <Form.Control>
        <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
          {!!firstName && !!lastName ? (
            <span>{fullName}</span>
          ) : !!firstName && firstNameTyping ? (
            <span className="text-muted-foreground">
              You are typing first name
            </span>
          ) : !!lastName && lastNameTyping ? (
            <span className="text-muted-foreground">
              You are typing last name
            </span>
          ) : !!firstName && !lastName ? (
            <span className="text-muted-foreground">Enter last name</span>
          ) : !!lastName && !firstName ? (
            <span className="text-muted-foreground">Enter first name</span>
          ) : (
            <span className="text-muted-foreground">
              Enter first and last name
            </span>
          )}
        </div>
      </Form.Control>
      <Form.Description>
        Automatically created from first and last name
      </Form.Description>
    </Form.Item>
  )
}

function Indicator() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Profile Completion</h3>
        <Badge variant="outline" className="bg-primary/10">
          Personal Info
        </Badge>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${isPersonalCompleted.value ? '100%' : '50%'}`,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {isPersonalCompleted.value
          ? 'Basic information complete! Fill out additional details for a comprehensive profile.'
          : 'Complete all required fields to proceed to the next section.'}
      </p>
    </div>
  )
}
