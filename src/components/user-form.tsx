import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, Button, Tabs } from '@/components/ui'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import type { UserFormValues } from '@/features/forms/user/schema'
import { formControl, control } from '@/features/forms/user'
import { DevTool } from '@hookform/devtools'
import { Form } from '@/features/forms/ui/form'

import PersonalInfoForm from '@/components/forms/personal-info-form'
import ProfessionalInfoForm from '@/components/forms/professional-info-form'
import FormSummary from '@/components/forms/form-summary'

export default function UserForm() {
  const [activeTab, setActiveTab] = useState('personal')

  const form = useForm({ formControl })

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
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="personal">Personal Information</Tabs.Trigger>
            <Tabs.Trigger value="professional">
              Professional Details
            </Tabs.Trigger>
            <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
          </Tabs.List>

          <Card.Content className="p-6">
            <Tabs.Content value="personal" className="space-y-4 mt-4">
              <PersonalInfoForm />
              <div className="flex justify-end mt-6">
                <Button type="button" variant="outline" onClick={nextTab}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="professional" className="space-y-4 mt-4">
              <ProfessionalInfoForm />
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevTab}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button type="button" variant="outline" onClick={nextTab}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="summary" className="mt-4">
              <FormSummary />
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevTab}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button type="submit" variant="outline">
                  <Save className="mr-2 h-4 w-4" /> Submit Form
                </Button>
              </div>
            </Tabs.Content>
          </Card.Content>
        </Tabs>
      </Card>
      <DevTool control={control} />
    </Form>
  )
}
