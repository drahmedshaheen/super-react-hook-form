import type { UserFormValues } from './schema'

export const defaultValues = {
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
} satisfies UserFormValues
