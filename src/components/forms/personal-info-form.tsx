import { useState, useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { control } from '@/features/forms/user'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Card, Select, Badge, Input, Popover } from '@/components/ui'
import { Button, Calendar, RadioGroup, Separator } from '@/components/ui'

export default function PersonalInfoForm() {
  return (
    <div className="space-y-8">
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Basic Information</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <Popover.Trigger asChild>
                    <FormControl>
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
                    </FormControl>
                  </Popover.Trigger>
                  <Popover.Content className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </Popover.Content>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Computed field: Age */}
          <AgeField />

          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="nonBinary" />
                      </FormControl>
                      <FormLabel className="font-normal">Non-binary</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="preferNotToSay" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prefer not to say
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
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
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Anytown" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="address.zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip/Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your country" />
                    </Select.Trigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your citizenship" />
                    </Select.Trigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number (Passport/National ID)</FormLabel>
                <FormControl>
                  <Input placeholder="AB123456" {...field} />
                </FormControl>
                <FormDescription>
                  Passport, driver's license, or other government-issued ID
                </FormDescription>
                <FormMessage />
              </FormItem>
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
  const [age, setAge] = useState<number | null>(null)

  // Watch values for computed fields
  const dateOfBirth = useWatch({
    control,
    name: 'dateOfBirth',
  })

  // Computed field: Age calculation
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(dateOfBirth)
      let calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--
      }

      setAge(calculatedAge)
    } else {
      setAge(null)
    }
  }, [dateOfBirth])

  return (
    <FormItem>
      <FormLabel>Age</FormLabel>
      <FormControl>
        <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
          {age !== null ? (
            <span>{age} years old</span>
          ) : (
            <span className="text-muted-foreground">Enter date of birth</span>
          )}
        </div>
      </FormControl>
      <FormDescription>
        Automatically calculated from your date of birth
      </FormDescription>
    </FormItem>
  )
}

function FullNameField() {
  // Watch values for computed fields
  const firstName = useWatch({
    control,
    name: 'firstName',
  })

  const lastName = useWatch({
    control,
    name: 'lastName',
  })

  return (
    <FormItem>
      <FormLabel>Full Name</FormLabel>
      <FormControl>
        <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
          {firstName && lastName ? (
            <span>{`${firstName} ${lastName}`}</span>
          ) : (
            <span className="text-muted-foreground">
              Enter first and last name
            </span>
          )}
        </div>
      </FormControl>
      <FormDescription>
        Automatically created from first and last name
      </FormDescription>
    </FormItem>
  )
}

function Indicator() {
  // Watch values for computed fields
  const dateOfBirth = useWatch({
    control,
    name: 'dateOfBirth',
  })

  const firstName = useWatch({
    control,
    name: 'firstName',
  })

  const lastName = useWatch({
    control,
    name: 'lastName',
  })

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
            width: `${firstName && lastName && dateOfBirth ? '100%' : '50%'}`,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {firstName && lastName && dateOfBirth
          ? 'Basic information complete! Fill out additional details for a comprehensive profile.'
          : 'Complete all required fields to proceed to the next section.'}
      </p>
    </div>
  )
}
