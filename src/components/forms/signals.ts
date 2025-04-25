import { signal, computed } from '@preact/signals-react'
import type { UserFormInput } from '@/features/forms/user/schema'
import { formControl } from '@/features/forms/user'
import { calculateAge, calculateTax, getExperienceLevel } from './calculations'

// Watch values for computed fields
const firstName = signal('')
const lastName = signal('')
const isFullName = computed(() => !!firstName.value && !!lastName.value)
export const fullName = computed(() => `${firstName} ${lastName}`)

const dateOfBirth = signal<Date | null>(null)
export const age = computed<number | null>(() =>
  dateOfBirth.value ? calculateAge(dateOfBirth.value) : null,
)
export const isAge = computed(() => age.value !== null)
export const isPersonalCompleted = computed(
  () => isFullName.value && isAge.value,
)

const profession = signal('')
const yearsOfExperience = signal('0')
export const experienceLevel = computed(() =>
  getExperienceLevel(yearsOfExperience.value),
)

const employmentStatus = signal<UserFormInput['employmentStatus']>(null)
export const isEmployed = computed(
  () =>
    employmentStatus.value === 'employed' ||
    employmentStatus.value === 'selfEmployed',
)
const firstSkillField = signal('')
const annualIncome = signal<string | null>(null)
export const isAnnualIncome = computed(() => annualIncome.value !== null)
export const taxEstimate = computed<string | null>(() =>
  annualIncome.value ? calculateTax(annualIncome.value) : 'Enter annual income',
)
export const isCareerInsights = computed(
  () =>
    !!employmentStatus.value && !!profession.value && !!yearsOfExperience.value,
)
export const careerInsightsMessage = computed(() => {
  switch (experienceLevel.value) {
    case 'Entry Level':
      return 'Consider focusing on building fundamental skills and seeking mentorship opportunities.'
    case 'Junior':
      return 'You have a good foundation. This is a great time to specialize and deepen your expertise.'
    case 'Mid-Level':
      return 'Your experience is valuable. Consider mentoring juniors and taking on leadership responsibilities.'
    case 'Senior':
      return 'Your expertise is significant. Consider consulting, teaching, or pursuing leadership positions.'
  }
})
export const isProfessionalCompleted = computed(
  () => !!employmentStatus.value && !!firstSkillField.value,
)

formControl.subscribe({
  formState: {
    isDirty: true,
    values: true,
  },
  callback: (formState) => {
    firstName.value = formState.values.firstName
    lastName.value = formState.values.lastName

    const newDate = formState.values.dateOfBirth
    const currentDate = dateOfBirth.value
    const areDatesDifferent = newDate?.getTime() !== currentDate?.getTime()
    if (areDatesDifferent) dateOfBirth.value = newDate

    profession.value = formState.values.profession
    yearsOfExperience.value = formState.values.yearsOfExperience
    firstSkillField.value = formState.values.skills.at(0)?.value ?? ''
    employmentStatus.value = formState.values.employmentStatus
    annualIncome.value = formState.values.annualIncome
  },
})
