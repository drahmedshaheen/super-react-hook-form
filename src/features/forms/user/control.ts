import { createFormControl } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { userFormSchema, type UserFormInput } from './schema'

const defaultValues: UserFormInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: undefined,
  gender: 'preferNotToSay',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  citizenship: '',
  identificationNumber: '',
  education: {
    highestDegree: 'bachelor',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
  },
  employmentStatus: 'employed',
  profession: '',
  yearsOfExperience: '',
  skills: [{ value: '' }],
  languages: [{ language: '', proficiency: 'beginner' }],
}

export const { formControl, control, getValues } = createFormControl({
  resolver: zodResolver(userFormSchema),
  defaultValues,
  mode: 'onChange',
})
