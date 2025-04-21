import { createFormControl } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  userFormSchema,
  type UserFormInput,
  type UserFormValues,
} from './schema'

const defaultValues: UserFormInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: null,
  gender: null,
  profilePicture: null,
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
    highestDegree: null,
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
  },
  employmentStatus: null,
  profession: '',
  jobTitle: null,
  company: null,
  annualIncome: null,
  yearsOfExperience: '',
  skills: [{ value: '' }],
  languages: [{ language: '', proficiency: 'beginner' }],
}

export const { formControl, control, getValues } = createFormControl<
  UserFormInput,
  any,
  UserFormValues
>({
  resolver: zodResolver(userFormSchema),
  defaultValues,
  mode: 'onChange',
})
