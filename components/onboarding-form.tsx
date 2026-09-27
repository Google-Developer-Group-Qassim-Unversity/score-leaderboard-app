'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Lock, User, GraduationCap, Mail } from 'lucide-react'
import { QU_COLLEGES, UNI_LEVELS, GRADUATED_LEVEL } from '@/lib/constants'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n-client'

// College name translations (official names from Qassim University website)
const COLLEGE_TRANSLATIONS: Record<string, string> = {
  "كلية الحاسب": "College of Computer",
  "كلية الطب": "College of Medicine",
  "كلية طب الأسنان": "College of Dentistry",
  "كلية الصيدلة": "College of Pharmacy",
  "كلية الهندسة": "College of Engineering",
  "كلية العلوم": "College of Science",
  "كلية العمارة والتخطيط": "College of Architecture and Planning",
  "كلية الزراعة والطب البيطري": "College of Agriculture and Food",
  "كلية الشريعة والدراسات الإسلامية": "College of Shari'ah",
  "كلية اللغة العربية والدراسات الاجتماعية": "College of Languages and Humanities",
  "كلية الاقتصاد والإدارة": "College of Business and Economics",
  "كلية العلوم الطبية التطبيقية": "College of Applied Medical Sciences",
  "كلية التمريض": "College of Nursing",
  "كلية التربية الدينية": "College of Education",
}

// Current university levels only - "graduated" is now its own status, not a level.
const CURRENT_LEVELS = UNI_LEVELS.filter((level) => level !== GRADUATED_LEVEL)

export type MemberStatus = 'qu_student' | 'graduate' | 'high_school'

// Form validation schema
const createOnboardingSchema = (t: (key: string) => string, personalEmailLocked: boolean) => z.object({
  uni_id: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{9}$/.test(value), {
      message: t('validation.universityId.exactly9Digits'),
    }),
  fullArabicName: z
    .string()
    .min(1, t('onboarding.validation.fullName.required')),
  saudiPhone: z
    .string()
    .length(10, t('onboarding.validation.phone.length'))
    .regex(/^05\d{8}$/, t('onboarding.validation.phone.format')),
  gender: z.enum(['Male', 'Female'], { required_error: t('onboarding.validation.gender.required') }),
  memberStatus: z.enum(['qu_student', 'graduate', 'high_school'], {
    required_error: t('onboarding.validation.status.required'),
  }),
  // Academic info is optional - not everyone signing up is a current QU student.
  uniLevel: z.number().optional(),
  uniCollegeSelection: z.string().optional(),
  uniCollegeOther: z.string().optional(),
  highSchoolName: z.string().optional(),
  personalEmail: personalEmailLocked
    ? z.string().email(t('onboarding.validation.email.invalid'))
    : z
        .string()
        .email(t('onboarding.validation.email.invalid'))
        .refine(
          (email) => {
            const domain = email.split('@')[1]
            return domain !== 'qu.edu.sa'
          },
          { message: t('onboarding.validation.email.notQuEmail') }
        ),
}).refine(
  (data) => {
    if (data.uniCollegeSelection === 'other') {
      return data.uniCollegeOther && data.uniCollegeOther.trim().length > 0
    }
    return true
  },
  {
    message: t('onboarding.validation.collegeOther.required'),
    path: ['uniCollegeOther'],
  }
)

function RequiredMark() {
  return <span className="text-destructive"> *</span>
}

function OptionalMark({ label }: { label: string }) {
  return <span className="text-muted-foreground font-normal text-xs"> ({label})</span>
}

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <legend className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4 w-full">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </legend>
  )
}

type OnboardingSchema = ReturnType<typeof createOnboardingSchema>
type FormValues = z.infer<OnboardingSchema>

// Transform form values to output values (with uni_college instead of selection/other)
export interface OnboardingFormValues {
  uni_id: string | undefined
  fullArabicName: string
  saudiPhone: string
  gender: 'Male' | 'Female'
  memberStatus: MemberStatus
  uniLevel: number | undefined
  uniCollege: string | undefined
  highSchoolName: string | undefined
  personalEmail: string
}

interface OnboardingFormProps {
  uniId: string
  /** For Google sign-ups: the Google account email, pre-filled and locked. */
  lockedPersonalEmail?: string
  onSubmit: (data: OnboardingFormValues) => void | Promise<void>
}

export function OnboardingForm({ uniId, lockedPersonalEmail, onSubmit }: OnboardingFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const language = i18n.language

  // Create schema with current translations
  const onboardingSchema = React.useMemo(
    () => createOnboardingSchema(t, !!lockedPersonalEmail),
    [t, lockedPersonalEmail]
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      uni_id: uniId,
      fullArabicName: '',
      saudiPhone: '',
      gender: undefined,
      memberStatus: undefined,
      uniLevel: undefined,
      uniCollegeSelection: '',
      uniCollegeOther: '',
      highSchoolName: '',
      personalEmail: lockedPersonalEmail || '',
    },
  })

  const collegeSelection = form.watch('uniCollegeSelection')
  const memberStatus = form.watch('memberStatus')

  // Update uni_id when it changes
  React.useEffect(() => {
    if (uniId) {
      form.setValue('uni_id', uniId)
    }
  }, [uniId, form])

  // Update personalEmail when the locked (Google account) value changes
  React.useEffect(() => {
    if (lockedPersonalEmail) {
      form.setValue('personalEmail', lockedPersonalEmail)
    }
  }, [lockedPersonalEmail, form])

  // Switching status clears whichever academic fields no longer apply, so a
  // stale hidden value never gets submitted alongside the new status.
  React.useEffect(() => {
    if (memberStatus === 'high_school') {
      form.setValue('uniLevel', undefined)
      form.setValue('uniCollegeSelection', '')
      form.setValue('uniCollegeOther', '')
    } else if (memberStatus) {
      form.setValue('highSchoolName', '')
      if (memberStatus === 'graduate') {
        form.setValue('uniLevel', undefined)
      }
    }
  }, [memberStatus, form])

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Transform to output format
      const outputData: OnboardingFormValues = {
        uni_id: data.uni_id?.trim() || undefined,
        fullArabicName: data.fullArabicName,
        saudiPhone: data.saudiPhone,
        gender: data.gender,
        memberStatus: data.memberStatus,
        uniLevel: data.uniLevel,
        uniCollege: data.uniCollegeSelection === 'other'
          ? data.uniCollegeOther
          : (data.uniCollegeSelection || undefined),
        highSchoolName: data.highSchoolName?.trim() || undefined,
        personalEmail: data.personalEmail,
      }
      await onSubmit(outputData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const showCollege = memberStatus === 'qu_student' || memberStatus === 'graduate'
  const showLevel = memberStatus === 'qu_student'
  const showHighSchool = memberStatus === 'high_school'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* ===== Personal info ===== */}
        <fieldset className="space-y-5">
          <SectionHeading icon={User}>{t('onboarding.section.personal')}</SectionHeading>

          {/* University ID - only shown at all for QU sign-ups (derived from their
              @qu.edu.sa email), locked since it's auto-filled. Google sign-ups never
              see this field - they have no uni_id to enter. */}
          {uniId && (
            <FormField
              control={form.control}
              name="uni_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.uniId.label')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="444444444"
                        {...field}
                        disabled={true}
                        className="bg-muted/60 cursor-not-allowed text-muted-foreground border-dashed opacity-70"
                        dir="ltr"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border">
                        <Lock className="h-3 w-3" />
                        {t('onboarding.uniId.autoFilled')}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullArabicName"
            render={({ field }) => (
              <FormItem>
                <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.fullName.label')}<RequiredMark /></FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('onboarding.fullName.placeholder')}
                    autoComplete="name"
                    {...field}
                    disabled={isSubmitting}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </FormControl>
                <FormDescription dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('onboarding.fullName.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Saudi Phone Number */}
          <FormField
            control={form.control}
            name="saudiPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.phone.label')}<RequiredMark /></FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t('onboarding.phone.placeholder')}
                    autoComplete="tel"
                    {...field}
                    maxLength={10}
                    disabled={isSubmitting}
                    dir="ltr"
                  />
                </FormControl>
                <FormDescription dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('onboarding.phone.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.gender.label')}<RequiredMark /></FormLabel>
                <FormControl>
                  <RadioGroup
                    dir={isRTL ? 'rtl' : 'ltr'}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    disabled={isSubmitting}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Male" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('onboarding.gender.male')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Female" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('onboarding.gender.female')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* ===== Academic status ===== */}
        <fieldset className="space-y-5 pt-2 border-t border-border/60">
          <SectionHeading icon={GraduationCap}>{t('onboarding.section.academic')}</SectionHeading>

          {/* Member Status */}
          <FormField
            control={form.control}
            name="memberStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.status.label')}<RequiredMark /></FormLabel>
                <FormControl>
                  <RadioGroup
                    dir={isRTL ? 'rtl' : 'ltr'}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    disabled={isSubmitting}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="qu_student" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('onboarding.status.quStudent')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="graduate" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('onboarding.status.graduate')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="high_school" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('onboarding.status.highSchool')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('onboarding.status.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* University Level - current QU students only */}
          {showLevel && (
            <FormField
              control={form.control}
              name="uniLevel"
              render={({ field }) => (
                <FormItem dir={isRTL ? 'rtl' : 'ltr'}>
                  <FormLabel>{t('onboarding.level.label')}<OptionalMark label={t('onboarding.optional')} /></FormLabel>
                  <FormControl>
                    <NativeSelect
                      {...field}
                      value={field.value?.toString() || ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      disabled={isSubmitting}
                    >
                      <NativeSelectOption value="">
                        {t('onboarding.level.placeholder')}
                      </NativeSelectOption>
                      {CURRENT_LEVELS.map((level) => (
                        <NativeSelectOption key={level} value={level.toString()}>
                          {level}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* University College - current QU students and graduates */}
          {showCollege && (
            <FormField
              control={form.control}
              name="uniCollegeSelection"
              render={({ field }) => (
                <FormItem dir={isRTL ? 'rtl' : 'ltr'}>
                  <FormLabel>{t('onboarding.college.label')}<OptionalMark label={t('onboarding.optional')} /></FormLabel>
                  <FormControl>
                    <NativeSelect
                      {...field}
                      disabled={isSubmitting}
                    >
                      <NativeSelectOption value="">
                        {t('onboarding.college.placeholder')}
                      </NativeSelectOption>
                      {QU_COLLEGES.map((college) => (
                        <NativeSelectOption key={college} value={college}>
                          {language === 'ar' ? college : (COLLEGE_TRANSLATIONS[college] || college)}
                        </NativeSelectOption>
                      ))}
                      <NativeSelectOption value="other">{t('onboarding.college.other')}</NativeSelectOption>
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Other College Input - shown when 'other' is selected */}
          {showCollege && collegeSelection === 'other' && (
            <FormField
              control={form.control}
              name="uniCollegeOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.collegeOther.label')}<RequiredMark /></FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('onboarding.collegeOther.placeholder')}
                      {...field}
                      disabled={isSubmitting}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* High school name - high schoolers only */}
          {showHighSchool && (
            <FormField
              control={form.control}
              name="highSchoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.highSchool.label')}<OptionalMark label={t('onboarding.optional')} /></FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('onboarding.highSchool.placeholder')}
                      {...field}
                      disabled={isSubmitting}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </fieldset>

        {/* ===== Contact ===== */}
        <fieldset className="space-y-5 pt-2 border-t border-border/60">
          <SectionHeading icon={Mail}>{t('onboarding.section.contact')}</SectionHeading>

          {/* Personal Email - locked to the Google account email for Google sign-ups,
              otherwise an editable "not your @qu.edu.sa email" field */}
          <FormField
            control={form.control}
            name="personalEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel dir={isRTL ? 'rtl' : 'ltr'}>{t('onboarding.email.label')}<RequiredMark /></FormLabel>
                <FormControl>
                  {lockedPersonalEmail ? (
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={true}
                        className="bg-muted/60 cursor-not-allowed text-muted-foreground border-dashed opacity-70 pr-24"
                        dir="ltr"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border">
                        <Lock className="h-3 w-3" />
                        {t('onboarding.uniId.autoFilled')}
                      </div>
                    </div>
                  ) : (
                    <Input
                      type="email"
                      placeholder={t('onboarding.email.placeholder')}
                      autoComplete="email"
                      {...field}
                      disabled={isSubmitting}
                      dir="ltr"
                    />
                  )}
                </FormControl>
                {!lockedPersonalEmail && (
                  <FormDescription dir={isRTL ? 'rtl' : 'ltr'}>
                    {t('onboarding.email.description')}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('onboarding.submitting')}
            </>
          ) : (
            t('onboarding.submit')
          )}
        </Button>
      </form>
    </Form>
  )
}
