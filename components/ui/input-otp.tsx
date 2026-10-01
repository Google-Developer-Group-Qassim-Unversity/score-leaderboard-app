'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn('flex items-center gap-3 has-[:disabled]:opacity-50', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  ),
)
InputOTP.displayName = 'InputOTP'

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex items-center gap-1', className)} {...props} />
}

function InputOTPSlot({ index, className, ...props }: React.ComponentProps<'div'> & { index: number }) {
  const context = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = context.slots[index]

  return (
    <div
      data-active={isActive}
      className={cn(
        'border-input bg-background relative flex size-9 items-center justify-center rounded-md border text-lg font-medium shadow-xs transition-all sm:size-11',
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><div className="bg-foreground h-5 w-px animate-pulse" /></div>}
    </div>
  )
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="separator" className={cn('text-muted-foreground', className)} {...props}><Minus className="size-4" /></div>
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
