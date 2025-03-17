"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastMessageProps {
  title: string
  description?: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export function ToastMessage({ title, description, type = "info", duration = 5000, onClose }: ToastMessageProps) {
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  }

  const bgColors = {
    success: "bg-green-50 dark:bg-green-950/30",
    error: "bg-red-50 dark:bg-red-950/30",
    info: "bg-blue-50 dark:bg-blue-950/30",
    warning: "bg-amber-50 dark:bg-amber-950/30",
  }

  const borderColors = {
    success: "border-green-200 dark:border-green-800",
    error: "border-red-200 dark:border-red-800",
    info: "border-blue-200 dark:border-blue-800",
    warning: "border-amber-200 dark:border-amber-800",
  }

  const showToast = () => {
    toast({
      title,
      description,
      variant: "default",
      className: cn("flex items-start gap-3 rounded-lg border p-4 shadow-md", bgColors[type], borderColors[type]),
      action: (
        <div className="flex items-center gap-3">
          {icons[type]}
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <button onClick={handleClose} className="rounded-full p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
      ),
    })
  }

  return (
    <button onClick={showToast} className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
      Show {type} toast
    </button>
  )
}

