import { control } from '@/features/forms/user'
import { Card, Alert, Button, RadioGroup, Label, Form } from '@/components/ui'
import { Input, Select, Badge, Slider, Separator } from '@/components/ui'
import { Plus, Trash, AlertCircle } from 'lucide-react'
import { formState$ } from '@/features/forms/user/subscribe'
import { formatCurrency } from './calculations'
import {
  experienceLevel,
  taxEstimate,
  isAnnualIncome,
  isEmployed,
  isProfessionalCompleted,
  isCareerInsights,
  careerInsightsMessage,
} from './signals'

export default function ProfessionalInfoForm() {
  return (
    <div className="space-y-8">
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Education & Experience</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          <Form.Field
            control={control}
            formState$={formState$}
            name="education.highestDegree"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Highest Degree</Form.Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                >
                  <Form.Control>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your highest degree" />
                    </Select.Trigger>
                  </Form.Control>
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
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="education.fieldOfStudy"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Field of Study</Form.Label>
                <Form.Control>
                  <Input placeholder="Computer Science" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="education.institution"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Institution</Form.Label>
                <Form.Control>
                  <Input placeholder="University of Example" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="education.graduationYear"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control>
                  <Input placeholder="2020" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="employmentStatus"
            render={({ field }) => (
              <Form.Item className="col-span-full">
                <Form.Label>Employment Status</Form.Label>
                <Form.Control>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    className="flex flex-wrap gap-4"
                  >
                    <Form.Item className="flex items-center space-x-2 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="employed" />
                      </Form.Control>
                      <Form.Label className="font-normal">Employed</Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-2 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="selfEmployed" />
                      </Form.Control>
                      <Form.Label className="font-normal">
                        Self-Employed
                      </Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-2 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="unemployed" />
                      </Form.Control>
                      <Form.Label className="font-normal">
                        Unemployed
                      </Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-2 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="student" />
                      </Form.Control>
                      <Form.Label className="font-normal">Student</Form.Label>
                    </Form.Item>
                    <Form.Item className="flex items-center space-x-2 space-y-0">
                      <Form.Control>
                        <RadioGroup.Item value="retired" />
                      </Form.Control>
                      <Form.Label className="font-normal">Retired</Form.Label>
                    </Form.Item>
                  </RadioGroup>
                </Form.Control>
                <Form.Message />
              </Form.Item>
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
          <Form.FieldArray
            control={control}
            name="skills"
            render={({
              fields: skillFields,
              append: appendSkill,
              remove: removeSkill,
            }) => (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Skills</Label>
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
                    <Form.Field
                      control={control}
                      formState$={formState$}
                      name={`skills.${index}.value`}
                      render={({ field }) => (
                        <Form.Item className="flex-1">
                          <Form.Control>
                            <Input
                              placeholder="e.g., JavaScript, Project Management, Design"
                              {...field}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
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
            )}
          />

          <Separator />

          <Form.FieldArray
            control={control}
            name="languages"
            render={({
              fields: languageFields,
              append: appendLanguage,
              remove: removeLanguage,
            }) => (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Languages</Label>
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
                    <Form.Field
                      control={control}
                      formState$={formState$}
                      name={`languages.${index}.language`}
                      render={({ field }) => (
                        <Form.Item className="col-span-2">
                          <Form.Control>
                            <Input
                              placeholder="e.g., English, Spanish, French"
                              {...field}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />

                    <div className="flex items-center gap-2">
                      <Form.Field
                        control={control}
                        formState$={formState$}
                        name={`languages.${index}.proficiency`}
                        render={({ field }) => (
                          <Form.Item className="flex-1">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.Control>
                                <Select.Trigger>
                                  <Select.Value placeholder="Proficiency" />
                                </Select.Trigger>
                              </Form.Control>
                              <Select.Content>
                                <Select.Item value="beginner">
                                  Beginner
                                </Select.Item>
                                <Select.Item value="intermediate">
                                  Intermediate
                                </Select.Item>
                                <Select.Item value="advanced">
                                  Advanced
                                </Select.Item>
                                <Select.Item value="native">Native</Select.Item>
                              </Select.Content>
                            </Select>
                            <Form.Message />
                          </Form.Item>
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
            )}
          />
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
  return (
    isEmployed.value && (
      <Card>
        <Card.Header>
          <Card.Title className="text-xl">Employment Details</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          <Form.Field
            control={control}
            formState$={formState$}
            name="profession"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Profession</Form.Label>
                <Form.Control>
                  <Input placeholder="Software Engineer" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="jobTitle"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Job Title</Form.Label>
                <Form.Control>
                  <Input
                    placeholder="Senior Developer"
                    {...field}
                    value={field.value ?? ''}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="company"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Company</Form.Label>
                <Form.Control>
                  <Input
                    placeholder="Example Corp"
                    {...field}
                    value={field.value ?? ''}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={control}
            formState$={formState$}
            name="yearsOfExperience"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control>
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
                </Form.Control>
                <Form.Description>
                  Years of professional experience in your field
                </Form.Description>
                <Form.Message />
              </Form.Item>
            )}
          />

          {/* Computed field: Experience Level */}
          <Form.Item>
            <Form.Label>Experience Level</Form.Label>
            <Form.Control>
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
                <span>{experienceLevel}</span>
              </div>
            </Form.Control>
            <Form.Description>
              Automatically determined based on years of experience
            </Form.Description>
          </Form.Item>

          <Form.Field
            control={control}
            formState$={formState$}
            name="annualIncome"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Annual Income</Form.Label>
                <Form.Control>
                  <Input
                    placeholder="$50,000"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatCurrency(e.target.value)
                      field.onChange(formatted)
                    }}
                    value={field.value ?? ''}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
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
  return (
    isAnnualIncome.value && (
      <Form.Item>
        <Form.Label>Estimated Annual Tax</Form.Label>
        <Form.Control>
          <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 text-muted-foreground flex items-center">
            {taxEstimate}
          </div>
        </Form.Control>
        <Form.Description>
          Simple estimate based on progressive tax brackets
        </Form.Description>
      </Form.Item>
    )
  )
}

function CareerInsights() {
  return (
    isCareerInsights.value && (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <Alert.Title>Career Insights</Alert.Title>
        <Alert.Description>{careerInsightsMessage}</Alert.Description>
      </Alert>
    )
  )
}

function Indicator() {
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
            width: `${isProfessionalCompleted.value ? '100%' : '50%'}`,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {isProfessionalCompleted.value
          ? 'Professional information complete! Review your information in the summary.'
          : 'Complete all required fields to build a comprehensive professional profile.'}
      </p>
    </div>
  )
}
