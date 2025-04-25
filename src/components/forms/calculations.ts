import type { UserFormValues } from '@/features/forms/user/schema'

// Calculate age
export const calculateAge = (birthDate: Date) => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

// Calculate experience level
export const getExperienceLevel = (years: string) => {
  const yearsNum = Number.parseInt(years)
  if (Number.isNaN(years)) return 'Not Specified'
  if (yearsNum >= 10) return 'Senior'
  if (yearsNum >= 5) return 'Mid-Level'
  if (yearsNum >= 2) return 'Junior'
  return 'Entry Level'
}

// Calculate estimate tax
export const calculateTax = (income: string) => {
  const incomeNum = Number.parseInt(income.replace(/[^0-9]/g, ''))
  if (Number.isNaN(incomeNum)) return null
  let taxAmount = 0

  if (incomeNum <= 50000) {
    taxAmount = incomeNum * 0.15
  } else if (incomeNum <= 100000) {
    taxAmount = 7500 + (incomeNum - 50000) * 0.25
  } else {
    taxAmount = 20000 + (incomeNum - 100000) * 0.35
  }

  return `$${taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

// Format address
export const formatAddress = (address: UserFormValues['address']) => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
}

// Function to format currency input
export const formatCurrency = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '')
  if (onlyNums) {
    const numValue = Number.parseInt(onlyNums)
    return `$${numValue.toLocaleString()}`
  }
  return ''
}
