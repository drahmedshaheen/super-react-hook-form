import { z } from 'zod'

// Define the validation schema
export const userFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z
    .date()
    .nullable()
    .refine((val) => val instanceof Date, {
      message: 'Date of birth is required',
    }),
  gender: z
    .enum(['male', 'female', 'nonBinary', 'preferNotToSay'])
    .nullable()
    .refine((val): val is NonNullable<typeof val> => val !== null, {
      message: 'Gender is required',
    }),
  profilePicture: z.string().nullable(),
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
    highestDegree: z
      .enum([
        'highSchool',
        'associate',
        'bachelor',
        'master',
        'doctorate',
        'other',
      ])
      .nullable()
      .refine((val): val is NonNullable<typeof val> => val !== null, {
        message: 'Highest Degree is required',
      }),
    fieldOfStudy: z.string().min(2, 'Field of study is required'),
    institution: z.string().min(2, 'Institution name is required'),
    graduationYear: z.string().min(4, 'Graduation year is required'),
  }),
  employmentStatus: z
    .enum(['employed', 'selfEmployed', 'unemployed', 'student', 'retired'])
    .nullable()
    .refine((val): val is NonNullable<typeof val> => val !== null, {
      message: 'Employment Status is required',
    }),
  profession: z.string().min(2, 'Profession is required'),
  jobTitle: z.string().nullable(),
  company: z.string().nullable(),
  yearsOfExperience: z.string(),
  annualIncome: z.string().nullable(),
  skills: z
    .array(z.object({ value: z.string() }))
    .min(1, 'At least one skill is required'),
  languages: z
    .array(
      z.object({
        language: z.string().min(2, 'Language name is required'),
        proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'native']),
      }),
    )
    .min(1, 'At least one language is required'),
})

export type UserFormValues = z.output<typeof userFormSchema>
export type UserFormInput = z.input<typeof userFormSchema>
