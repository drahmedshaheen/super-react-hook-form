import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import PersonalInfoForm from '@/components/forms/personal-info-form'
import ProfessionalInfoForm from '@/components/forms/professional-info-form'
import FormSummary from '@/components/forms/form-summary'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'

// Define the validation schema
export const userFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.date(),
  gender: z.enum(['male', 'female', 'nonBinary', 'preferNotToSay']),
  profilePicture: z.string().optional(),
  address: z.object({
    street: z.string().min(3, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'Valid zip code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  citizenship: z.string().min(2, 'Citizenship is required'),
  identificationNumber: z.string().min(4, 'ID number is required'),

  // Professional Info
  education: z.object({
    highestDegree: z.enum([
      'highSchool',
      'associate',
      'bachelor',
      'master',
      'doctorate',
      'other',
    ]),
    fieldOfStudy: z.string().min(2, 'Field of study is required'),
    institution: z.string().min(2, 'Institution name is required'),
    graduationYear: z.string().min(4, 'Graduation year is required'),
  }),
  employmentStatus: z.enum([
    'employed',
    'selfEmployed',
    'unemployed',
    'student',
    'retired',
  ]),
  profession: z.string().min(2, 'Profession is required'),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  yearsOfExperience: z.string(),
  annualIncome: z.string().optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  languages: z
    .array(
      z.object({
        language: z.string().min(2, 'Language name is required'),
        proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'native']),
      }),
    )
    .min(1, 'At least one language is required'),

  // Preferences and emergency contacts are omitted for brevity
})

export type UserFormValues = z.infer<typeof userFormSchema>

const defaultValues: Partial<UserFormValues> = {
  gender: 'preferNotToSay',
  skills: [''],
  languages: [{ language: '', proficiency: 'beginner' }],
  employmentStatus: 'employed',
  education: {
    highestDegree: 'bachelor',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
}

export default function UserForm() {
  const [activeTab, setActiveTab] = useState('personal')

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = (data: UserFormValues) => {
    console.log('Form submitted:', data)
    toast.success('Form submitted successfully')
  }

  const nextTab = () => {
    if (activeTab === 'personal') {
      const isValid = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'dateOfBirth',
        'gender',
        'citizenship',
      ].every((field) => form.getFieldState(field).invalid === false)

      if (isValid) {
        setActiveTab('professional')
      } else {
        form.trigger()
        toast.error(
          'Please fill out all required fields correctly before proceeding',
        )
      }
    } else if (activeTab === 'professional') {
      setActiveTab('summary')
    }
  }

  const prevTab = () => {
    if (activeTab === 'professional') {
      setActiveTab('personal')
    } else if (activeTab === 'summary') {
      setActiveTab('professional')
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mb-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="professional">
                Professional Details
              </TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <CardContent className="p-6">
              <TabsContent value="personal" className="space-y-4 mt-4">
                <PersonalInfoForm />
                <div className="flex justify-end mt-6">
                  <Button type="button" onClick={nextTab}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4 mt-4">
                <ProfessionalInfoForm />
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-4">
                <FormSummary />
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Submit Form
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </form>
    </FormProvider>
  )
}
