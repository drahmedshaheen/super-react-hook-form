import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import PersonalInfoForm from '@/components/forms/personal-info-form'
import ProfessionalInfoForm from '@/components/forms/professional-info-form'
import FormSummary from '@/components/forms/form-summary'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import {
  userFormSchema,
  type UserFormValues,
} from '@/features/forms/user/schema'
import { defaultValues } from '@/features/forms/user/control'

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
      const isValid = (
        [
          'firstName',
          'lastName',
          'email',
          'phone',
          'dateOfBirth',
          'gender',
          'citizenship',
        ] as const
      ).every((field) => form.getFieldState(field).invalid === false)

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
