import { useFormContext } from 'react-hook-form'
import type { UserFormValues } from '@/features/forms/user/schema'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function FormSummary() {
  const { getValues } = useFormContext<UserFormValues>()
  const values = getValues()

  // Calculate age
  const calculateAge = (birthDate: Date) => {
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
  const getExperienceLevel = (years: string) => {
    const yearsNum = Number.parseInt(years)

    if (yearsNum >= 10) return 'Senior'
    if (yearsNum >= 5) return 'Mid-Level'
    if (yearsNum >= 2) return 'Junior'
    return 'Entry Level'
  }

  // Format address
  const formatAddress = (address: UserFormValues['address']) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h4>
              <p className="font-medium">
                {values.firstName} {values.lastName}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Contact Information
              </h4>
              <p>{values.email}</p>
              <p>{values.phone}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Date of Birth
              </h4>
              <p>
                {values.dateOfBirth
                  ? format(values.dateOfBirth, 'PPP')
                  : 'Not provided'}
              </p>
              {values.dateOfBirth && (
                <Badge variant="outline" className="mt-1">
                  {calculateAge(values.dateOfBirth)} years old
                </Badge>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Gender
              </h4>
              <p>
                {values.gender === 'male' && 'Male'}
                {values.gender === 'female' && 'Female'}
                {values.gender === 'nonBinary' && 'Non-binary'}
                {values.gender === 'preferNotToSay' && 'Prefer not to say'}
              </p>
            </div>

            <Separator />

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Address
              </h4>
              <p className="whitespace-pre-wrap">
                {formatAddress(values.address)}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Citizenship
              </h4>
              <p>{values.citizenship}</p>
              <p className="text-sm text-muted-foreground">
                ID: {values.identificationNumber}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Work and education details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Education
              </h4>
              <p className="font-medium">
                {values.education.highestDegree === 'highSchool' &&
                  'High School Diploma'}
                {values.education.highestDegree === 'associate' &&
                  "Associate's Degree"}
                {values.education.highestDegree === 'bachelor' &&
                  "Bachelor's Degree"}
                {values.education.highestDegree === 'master' &&
                  "Master's Degree"}
                {values.education.highestDegree === 'doctorate' &&
                  'Doctorate/PhD'}
                {values.education.highestDegree === 'other' && 'Other'}
              </p>
              <p>{values.education.fieldOfStudy}</p>
              <p className="text-sm text-muted-foreground">
                {values.education.institution},{' '}
                {values.education.graduationYear}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">
                Employment Status
              </h4>
              <Badge
                className={cn(
                  'mt-1',
                  values.employmentStatus === 'employed' && 'bg-green-500',
                  values.employmentStatus === 'selfEmployed' && 'bg-blue-500',
                  values.employmentStatus === 'unemployed' && 'bg-amber-500',
                  values.employmentStatus === 'student' && 'bg-purple-500',
                  values.employmentStatus === 'retired' && 'bg-gray-500',
                )}
              >
                {values.employmentStatus === 'employed' && 'Employed'}
                {values.employmentStatus === 'selfEmployed' && 'Self-Employed'}
                {values.employmentStatus === 'unemployed' && 'Unemployed'}
                {values.employmentStatus === 'student' && 'Student'}
                {values.employmentStatus === 'retired' && 'Retired'}
              </Badge>
            </div>

            {(values.employmentStatus === 'employed' ||
              values.employmentStatus === 'selfEmployed') && (
              <>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Professional Details
                  </h4>
                  <p className="font-medium">{values.profession}</p>
                  {values.jobTitle && <p>{values.jobTitle}</p>}
                  {values.company && (
                    <p className="text-sm text-muted-foreground">
                      {values.company}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Experience
                  </h4>
                  <div className="flex items-center gap-2">
                    <p>{values.yearsOfExperience} years</p>
                    <Badge variant="outline">
                      {getExperienceLevel(values.yearsOfExperience)}
                    </Badge>
                  </div>
                </div>

                {values.annualIncome && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Income
                    </h4>
                    <p>{values.annualIncome}</p>
                  </div>
                )}
              </>
            )}

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {values.skills.map(
                  (skill, index) =>
                    skill.value && (
                      <Badge
                        key={`skills-${index}-${skill.value}`}
                        variant="secondary"
                      >
                        {skill.value}
                      </Badge>
                    ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Languages
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {values.languages.map(
                  (lang, index) =>
                    lang.language && (
                      <div
                        key={`languages-${index}-${lang.language}`}
                        className="flex items-center gap-2"
                      >
                        <span>{lang.language}</span>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {lang.proficiency === 'beginner' && 'Beginner'}
                          {lang.proficiency === 'intermediate' &&
                            'Intermediate'}
                          {lang.proficiency === 'advanced' && 'Advanced'}
                          {lang.proficiency === 'native' && 'Native'}
                        </Badge>
                      </div>
                    ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/40">
        <CardHeader className="pb-2">
          <CardTitle>Form Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Personal Information</span>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-600"
              >
                Complete
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span>Professional Information</span>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-600"
              >
                Complete
              </Badge>
            </div>

            <div className="h-2 w-full bg-secondary rounded-full mt-4">
              <div className="h-full w-full bg-primary rounded-full" />
            </div>

            <p className="text-sm text-muted-foreground text-center mt-2">
              All required information has been provided. You can now submit the
              form.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
