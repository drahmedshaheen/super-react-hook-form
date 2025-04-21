import { useState, useEffect } from 'react'
import { useWatch, useFieldArray } from 'react-hook-form'
import { control } from '@/features/forms/user'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Card, Alert, Button, RadioGroup } from '@/components/ui'
import { Input, Select, Badge, Slider, Separator } from '@/components/ui'
import { Plus, Trash, AlertCircle } from 'lucide-react'
import { signal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'

const experienceLevel = signal('Junior')

// Function to format currency input
const formatCurrency = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '')
  if (onlyNums) {
    const numValue = Number.parseInt(onlyNums)
    return `$${numValue.toLocaleString()}`
  }
  return ''
}

export default function ProfessionalInfoForm() {
  return (
    <div className="space-y-8">
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Education & Experience</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="education.highestDegree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highest Degree</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                >
                  <FormControl>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your highest degree" />
                    </Select.Trigger>
                  </FormControl>
                  <Select.Content>
                    <Select.Item value="highSchool">
                      High School Diploma
                    </Select.Item>
                    <Select.Item value="associate">
                      Associate's Degree
                    </Select.Item>
                    <Select.Item value="bachelor">
                      Bachelor's Degree
                    </Select.Item>
                    <Select.Item value="master">Master's Degree</Select.Item>
                    <Select.Item value="doctorate">Doctorate/PhD</Select.Item>
                    <Select.Item value="other">Other</Select.Item>
                  </Select.Content>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="education.fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="education.institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="University of Example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="education.graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input placeholder="2020" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Employment Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    className="flex flex-wrap gap-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="employed" />
                      </FormControl>
                      <FormLabel className="font-normal">Employed</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="selfEmployed" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Self-Employed
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="unemployed" />
                      </FormControl>
                      <FormLabel className="font-normal">Unemployed</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="student" />
                      </FormControl>
                      <FormLabel className="font-normal">Student</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroup.Item value="retired" />
                      </FormControl>
                      <FormLabel className="font-normal">Retired</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card.Content>
      </Card>

      {/* Conditional card. based on employment status */}
      <EmployedOrSelfEmployed />

      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Skills & Languages</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-6">
          <SkillFields />

          <Separator />

          <LanguageFields />
        </Card.Content>
      </Card>

      {/* Career advice based on inputs - computed content */}
      <CareerInsights />

      {/* Profile completion indicator - computed field */}
      <Indicator />
    </div>
  )
}

function EmployedOrSelfEmployed() {
  // Watch values for computed fields
  const employmentStatus = useWatch({
    control,
    name: 'employmentStatus',
  })

  return (
    (employmentStatus === 'employed' ||
      employmentStatus === 'selfEmployed') && (
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Employment Details</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Senior Developer"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example Corp"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[Number.parseInt(field.value || '0')]}
                      onValueChange={(values) =>
                        field.onChange(values[0].toString())
                      }
                      max={40}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{field.value || 0}</span>
                  </div>
                </FormControl>
                <FormDescription>
                  Years of professional experience in your field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Computed field: Experience Level */}
          <FormItem>
            <FormLabel>Experience Level</FormLabel>
            <FormControl>
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
                <span>{experienceLevel.value}</span>
              </div>
            </FormControl>
            <FormDescription>
              Automatically determined based on years of experience
            </FormDescription>
          </FormItem>

          <FormField
            control={control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input
                    placeholder="$50,000"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatCurrency(e.target.value)
                      field.onChange(formatted)
                    }}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Computed field: Estimated Tax */}
          <EstimatedTax />
        </Card.Content>
      </Card>
    )
  )
}

function EstimatedTax() {
  const annualIncome = useWatch({
    control,
    name: 'annualIncome',
  })

  const [taxEstimate, setTaxEstimate] = useState<string | null>(null)

  // Computed field: Tax estimate based on income
  useEffect(() => {
    if (annualIncome) {
      const income = Number.parseInt(annualIncome.replace(/[^0-9]/g, ''))

      if (!Number.isNaN(income)) {
        // Simple progressive tax calculation for demonstration
        let taxAmount = 0

        if (income <= 50000) {
          taxAmount = income * 0.15
        } else if (income <= 100000) {
          taxAmount = 7500 + (income - 50000) * 0.25
        } else {
          taxAmount = 20000 + (income - 100000) * 0.35
        }

        setTaxEstimate(
          `$${taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        )
      } else {
        setTaxEstimate(null)
      }
    } else {
      setTaxEstimate(null)
    }
  }, [annualIncome])

  return (
    annualIncome && (
      <FormItem>
        <FormLabel>Estimated Annual Tax</FormLabel>
        <FormControl>
          <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
            {taxEstimate || 'Enter annual income'}
          </div>
        </FormControl>
        <FormDescription>
          Simple estimate based on progressive tax brackets
        </FormDescription>
      </FormItem>
    )
  )
}

function SkillFields() {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Skills</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendSkill({ value: '' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {skillFields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`skills.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="e.g., JavaScript, Project Management, Design"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeSkill(index)}
            disabled={skillFields.length === 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

function LanguageFields() {
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Languages</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendLanguage({ language: '', proficiency: 'beginner' })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>

      {languageFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-start">
          <FormField
            control={control}
            name={`languages.${index}.language`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    placeholder="e.g., English, Spanish, French"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <FormField
              control={control}
              name={`languages.${index}.proficiency`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <Select.Trigger>
                        <Select.Value placeholder="Proficiency" />
                      </Select.Trigger>
                    </FormControl>
                    <Select.Content>
                      <Select.Item value="beginner">Beginner</Select.Item>
                      <Select.Item value="intermediate">
                        Intermediate
                      </Select.Item>
                      <Select.Item value="advanced">Advanced</Select.Item>
                      <Select.Item value="native">Native</Select.Item>
                    </Select.Content>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLanguage(index)}
              disabled={languageFields.length === 1}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function CareerInsights() {
  // Watch values for computed fields
  const profession = useWatch({
    control,
    name: 'profession',
  })

  const employmentStatus = useWatch({
    control,
    name: 'employmentStatus',
  })

  const yearsOfExperience = useWatch({
    control,
    name: 'yearsOfExperience',
  })

  useSignals()

  // Computed field: Experience level based on years
  useEffect(() => {
    if (yearsOfExperience) {
      const years = Number.parseInt(yearsOfExperience)
      let level = 'Entry Level'

      if (years >= 10) {
        level = 'Senior'
      } else if (years >= 5) {
        level = 'Mid-Level'
      } else if (years >= 2) {
        level = 'Junior'
      }

      experienceLevel.value = level
    } else {
      experienceLevel.value = 'Not Specified'
    }
  }, [yearsOfExperience])

  return (
    employmentStatus &&
    profession &&
    yearsOfExperience && (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <Alert.Title>Career Insights</Alert.Title>
        <Alert.Description>
          {experienceLevel.value === 'Entry Level' &&
            'Consider focusing on building fundamental skills and seeking mentorship opportunities.'}
          {experienceLevel.value === 'Junior' &&
            'You have a good foundation. This is a great time to specialize and deepen your expertise.'}
          {experienceLevel.value === 'Mid-Level' &&
            'Your experience is valuable. Consider mentoring juniors and taking on leadership responsibilities.'}
          {experienceLevel.value === 'Senior' &&
            'Your expertise is significant. Consider consulting, teaching, or pursuing leadership positions.'}
        </Alert.Description>
      </Alert>
    )
  )
}

function Indicator() {
  // Watch values for computed fields
  const employmentStatus = useWatch({
    control,
    name: 'employmentStatus',
  })

  const skillFields = useWatch({
    control,
    name: 'skills',
  })

  return (
    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Profile Completion</h3>
        <Badge variant="outline" className="bg-primary/10">
          Professional Info
        </Badge>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${employmentStatus && skillFields[0].value ? '100%' : '50%'}`,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {employmentStatus && skillFields[0].value
          ? 'Professional information complete! Review your information in the summary.'
          : 'Complete all required fields to build a comprehensive professional profile.'}
      </p>
    </div>
  )
}
