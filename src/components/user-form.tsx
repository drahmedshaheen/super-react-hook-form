import { useForm } from 'react-hook-form'
import { Card, Button, Tabs } from '@/components/ui'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import type { UserFormValues } from '@/features/forms/user/schema'
import { formControl } from '@/features/forms/user'

import { Form } from '@/features/forms/ui/form'
import { signal } from '@preact/signals-react'

import PersonalInfoForm from '@/components/forms/personal-info-form'
import ProfessionalInfoForm from '@/components/forms/professional-info-form'
import FormSummary from '@/components/forms/form-summary'

const activeTab = signal('personal')

const nextTab = () => {
  if (activeTab.value === 'personal') {
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
    ).every((field) => formControl.getFieldState(field).invalid === false)

    if (isValid) {
      activeTab.value = 'professional'
    } else {
      formControl.trigger()
      toast.error(
        'Please fill out all required fields correctly before proceeding',
      )
    }
  } else if (activeTab.value === 'professional') {
    activeTab.value = 'summary'
  }
}

const prevTab = () => {
  if (activeTab.value === 'professional') {
    activeTab.value = 'personal'
  } else if (activeTab.value === 'summary') {
    activeTab.value = 'professional'
  }
}

const setActiveTab = (value: string) => {
  activeTab.value = value
}

const onSubmit = (data: UserFormValues) => {
  console.log('Form submitted:', data)
  toast.success('Form submitted successfully')
}

export default function UserForm() {
  useForm({ formControl })

  return (
    <Form onSubmit={formControl.handleSubmit(onSubmit)}>
      <Card className="mb-8">
        <Tabs
          value={activeTab.value}
          onValueChange={setActiveTab}
          className="w-full"
        >
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
    </Form>
  )
}
