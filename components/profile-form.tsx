'use client'

import * as React from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Loader2, Lock, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateClerkMetadata } from '@/lib/actions'
import { getCurrentMember, updateCurrentMember, type UpdateMemberData } from '@/lib/api'
import { cn } from '@/lib/utils'

const QU_COLLEGES = [
  "كلية الحاسب",
  "كلية الطب",
  "كلية طب الأسنان",
  "كلية الصيدلة",
  "كلية الهندسة",
  "كلية العلوم",
  "كلية العمارة والتخطيط",
  "كلية الزراعة والطب البيطري",
  "كلية الشريعة والدراسات الإسلامية",
  "كلية اللغة العربية والدراسات الاجتماعية",
  "كلية الاقتصاد والإدارة",
  "كلية العلوم الطبية التطبيقية",
  "كلية التمريض",
  "كلية التربية الدينية",
  "أخرى"
] as const

const UNI_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

interface FormData {
  uni_id: string
  fullArabicName: string
  saudiPhone: string
  gender: 'Male' | 'Female'
  uniLevel: number
  uniCollege: string
  uniCollegeOther: string
  personalEmail: string
}

export function ProfileForm() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [showOtherCollege, setShowOtherCollege] = React.useState(false)
  
  const [formData, setFormData] = React.useState<FormData>({
    uni_id: '',
    fullArabicName: '',
    saudiPhone: '',
    gender: 'Male',
    uniLevel: 1,
    uniCollege: '',
    uniCollegeOther: '',
    personalEmail: '',
  })

  const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({})

  React.useEffect(() => {
    if (!isLoaded || !user) return
    
    const metadata = user.publicMetadata as Record<string, unknown>
    const uniId = metadata?.uni_id as string || ''
    const college = metadata?.uniCollege as string || ''
    const isOtherCollege = college && !QU_COLLEGES.includes(college as typeof QU_COLLEGES[number])
    
    setFormData({
      uni_id: uniId,
      fullArabicName: (metadata?.fullArabicName as string) || '',
      saudiPhone: (metadata?.saudiPhone as string) || '',
      gender: (metadata?.gender as 'Male' | 'Female') || 'Male',
      uniLevel: (metadata?.uniLevel as number) || 1,
      uniCollege: isOtherCollege ? 'أخرى' : college,
      uniCollegeOther: isOtherCollege ? college : '',
      personalEmail: (metadata?.personalEmail as string) || '',
    })
    setShowOtherCollege(isOtherCollege)
    setIsLoading(false)
  }, [isLoaded, user])

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.fullArabicName.trim()) {
      newErrors.fullArabicName = 'Name is required'
    }

    if (!formData.saudiPhone) {
      newErrors.saudiPhone = 'Phone number is required'
    } else if (!/^05\d{8}$/.test(formData.saudiPhone)) {
      newErrors.saudiPhone = 'Phone must start with 05 and be 10 digits'
    }

    if (!formData.uniCollege) {
      newErrors.uniCollege = 'Please select a college'
    }

    if (formData.uniCollege === 'أخرى' && !formData.uniCollegeOther.trim()) {
      newErrors.uniCollegeOther = 'Please enter your college name'
    }

    if (!formData.personalEmail) {
      newErrors.personalEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Invalid email address'
    } else if (formData.personalEmail.endsWith('@qu.edu.sa')) {
      newErrors.personalEmail = 'Personal email cannot be a @qu.edu.sa address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSaving(true)
    
    try {
      const college = formData.uniCollege === 'أخرى' ? formData.uniCollegeOther : formData.uniCollege
      
      const clerkData = {
        uni_id: formData.uni_id,
        fullArabicName: formData.fullArabicName,
        saudiPhone: formData.saudiPhone,
        gender: formData.gender,
        uniLevel: formData.uniLevel,
        uniCollege: college,
        personalEmail: formData.personalEmail,
      }

      const backendData: UpdateMemberData = {
        name: formData.fullArabicName,
        email: formData.personalEmail,
        phone_number: formData.saudiPhone,
        gender: formData.gender,
        uni_level: formData.uniLevel,
        uni_college: college,
      }

      const clerkResult = await updateClerkMetadata(clerkData)
      
      if (clerkResult.error) {
        toast.error(clerkResult.error)
        setIsSaving(false)
        return
      }

      await user?.reload()
      
      try {
        const token = await getToken()
        if (token) {
          console.log('🔄 Calling backend API to update member...')
          const backendResult = await updateCurrentMember(backendData, token)
          if (!backendResult) {
            console.warn('⚠️ Backend update returned null')
            toast.warning('Clerk updated but backend sync failed. Your data may take time to sync.')
          } else {
            console.log('✅ Backend update successful:', backendResult)
          }
        } else {
          console.warn('⚠️ No auth token available, skipping backend sync')
          toast.warning('Clerk updated but backend sync was skipped (no token).')
        }
      } catch (apiError) {
        console.error('❌ Backend API error:', apiError)
        toast.warning('Clerk updated but backend sync failed.')
      }

      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">الرقم الجامعي</label>
        <div className="relative">
          <Input
            value={formData.uni_id}
            disabled
            className="bg-muted/60 cursor-not-allowed text-muted-foreground border-dashed opacity-70 pr-16"
            dir="ltr"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border">
            <Lock className="h-3 w-3" />
            <span>Locked</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">الاسم</label>
        <Input
          value={formData.fullArabicName}
          onChange={(e) => handleChange('fullArabicName', e.target.value)}
          placeholder="مثال: ابراهيم محمد بسام الحربي"
          dir="rtl"
          disabled={isSaving}
          className={cn(errors.fullArabicName && 'border-destructive')}
        />
        {errors.fullArabicName && (
          <p className="text-xs text-destructive">{errors.fullArabicName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">رقم الجوال</label>
        <Input
          value={formData.saudiPhone}
          onChange={(e) => handleChange('saudiPhone', e.target.value.slice(0, 10))}
          placeholder="05xxxxxxxx"
          dir="ltr"
          disabled={isSaving}
          className={cn(errors.saudiPhone && 'border-destructive')}
        />
        {errors.saudiPhone && (
          <p className="text-xs text-destructive">{errors.saudiPhone}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">القسم</label>
        <div className="flex gap-4" dir="rtl">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={() => handleChange('gender', 'Male')}
              disabled={isSaving}
              className="h-4 w-4"
            />
            <span className="text-sm">طلاب</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={() => handleChange('gender', 'Female')}
              disabled={isSaving}
              className="h-4 w-4"
            />
            <span className="text-sm">طالبات</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">المستوى الدراسي</label>
        <select
          value={formData.uniLevel}
          onChange={(e) => handleChange('uniLevel', Number(e.target.value))}
          disabled={isSaving}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          dir="rtl"
        >
          <option value="" disabled>اختر المستوى</option>
          {UNI_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">الكلية</label>
        <select
          value={formData.uniCollege}
          onChange={(e) => {
            handleChange('uniCollege', e.target.value)
            setShowOtherCollege(e.target.value === 'أخرى')
          }}
          disabled={isSaving}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            errors.uniCollege && 'border-destructive'
          )}
          dir="rtl"
        >
          <option value="" disabled>اختر الكلية</option>
          {QU_COLLEGES.map((college) => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>
        {errors.uniCollege && (
          <p className="text-xs text-destructive">{errors.uniCollege}</p>
        )}
      </div>

      {showOtherCollege && (
        <div className="space-y-2">
          <label className="text-sm font-medium" dir="rtl">اسم الكلية</label>
          <Input
            value={formData.uniCollegeOther}
            onChange={(e) => handleChange('uniCollegeOther', e.target.value)}
            placeholder="أدخل اسم كليتك"
            dir="rtl"
            disabled={isSaving}
            className={cn(errors.uniCollegeOther && 'border-destructive')}
          />
          {errors.uniCollegeOther && (
            <p className="text-xs text-destructive">{errors.uniCollegeOther}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium" dir="rtl">البريد الشخصي</label>
        <Input
          type="email"
          value={formData.personalEmail}
          onChange={(e) => handleChange('personalEmail', e.target.value)}
          placeholder="example@example.com"
          dir="ltr"
          disabled={isSaving}
          className={cn(errors.personalEmail && 'border-destructive')}
        />
        <p className="text-xs text-muted-foreground" dir="rtl">
          البريد الشخصي وليس المنتهي بـ qu.edu.sa@
        </p>
        {errors.personalEmail && (
          <p className="text-xs text-destructive">{errors.personalEmail}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSaving}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري الحفظ...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            حفظ التغييرات
          </>
        )}
      </Button>
    </form>
  )
}
