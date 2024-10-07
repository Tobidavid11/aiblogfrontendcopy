'use client'

import React from 'react'
import CustomButton from '../app/components/CustomButton/Button'
import { LucideIcon } from 'lucide-react'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
type ButtonVariant = 'solid' | 'outline' | 'text'

interface ClientButtonProps {
  size?: ButtonSize
  color?: ButtonColor
  icon?: LucideIcon
  variant?: ButtonVariant
  disabled?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
}

export default function ClientCustomButton({
  onClick,
  ...props
}: ClientButtonProps) {
  return (
    <div onClick={onClick}>
      <CustomButton {...props} />
    </div>
  )
}