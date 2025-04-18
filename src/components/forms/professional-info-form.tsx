import { useFormContext, useWatch, useFieldArray } from 'react-hook-form'
import type { UserFormValues } from '@/features/forms/user/schema'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Plus, Trash, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ProfessionalInfoForm() {
  const { control } = useFormContext<UserFormValues>()

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: 'skills' })

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control, name: 'languages' })

  const profession = useWatch({
    control,
    name: 'profession',
  })

  // Watch values for computed fields
  const employmentStatus = useWatch({
    control,
    name: 'employmentStatus',
  })

  const annualIncome = useWatch({
    control,
    name: 'annualIncome',
  })

  const yearsOfExperience = useWatch({
    control,
    name: 'yearsOfExperience',
  })

  const [experienceLevel, setExperienceLevel] = useState<string>('Junior')
  const [taxEstimate, setTaxEstimate] = useState<string | null>(null)

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

      setExperienceLevel(level)
    } else {
      setExperienceLevel('Not Specified')
    }
  }, [yearsOfExperience])

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

  // Function to format currency input
  const formatCurrency = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, '')
    if (onlyNums) {
      const numValue = Number.parseInt(onlyNums)
      return `$${numValue.toLocaleString()}`
    }
    return ''
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Education & Experience</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="education.highestDegree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highest Degree</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your highest degree" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="highSchool">
                      High School Diploma
                    </SelectItem>
                    <SelectItem value="associate">
                      Associate's Degree
                    </SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate/PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
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
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="employed" />
                      </FormControl>
                      <FormLabel className="font-normal">Employed</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="selfEmployed" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Self-Employed
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="unemployed" />
                      </FormControl>
                      <FormLabel className="font-normal">Unemployed</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="student" />
                      </FormControl>
                      <FormLabel className="font-normal">Student</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="retired" />
                      </FormControl>
                      <FormLabel className="font-normal">Retired</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Conditional card based on employment status */}
      {(employmentStatus === 'employed' ||
        employmentStatus === 'selfEmployed') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Input placeholder="Senior Developer" {...field} />
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
                    <Input placeholder="Example Corp" {...field} />
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
                      <span className="w-12 text-center">
                        {field.value || 0}
                      </span>
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
                  <span>{experienceLevel}</span>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Computed field: Estimated Tax */}
            {annualIncome && (
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
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Skills & Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <Separator />

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
              <div
                key={field.id}
                className="grid grid-cols-3 gap-4 items-start"
              >
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
                            <SelectTrigger>
                              <SelectValue placeholder="Proficiency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="native">Native</SelectItem>
                          </SelectContent>
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
        </CardContent>
      </Card>

      {/* Career advice based on inputs - computed content */}
      {employmentStatus && profession && yearsOfExperience && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Career Insights</AlertTitle>
          <AlertDescription>
            {experienceLevel === 'Entry Level' &&
              'Consider focusing on building fundamental skills and seeking mentorship opportunities.'}
            {experienceLevel === 'Junior' &&
              'You have a good foundation. This is a great time to specialize and deepen your expertise.'}
            {experienceLevel === 'Mid-Level' &&
              'Your experience is valuable. Consider mentoring juniors and taking on leadership responsibilities.'}
            {experienceLevel === 'Senior' &&
              'Your expertise is significant. Consider consulting, teaching, or pursuing leadership positions.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Profile completion indicator - computed field */}
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
              width: `${employmentStatus && skillFields[0] ? '100%' : '50%'}`,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {employmentStatus && skillFields[0]
            ? 'Professional information complete! Review your information in the summary.'
            : 'Complete all required fields to build a comprehensive professional profile.'}
        </p>
      </div>
    </div>
  )
}
