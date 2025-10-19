"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { cva, type VariantProps } from "class-variance-authority"
import { Upload, X, Image as ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const imageUploadVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg border border-dashed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary/50",
        destructive: "border-destructive hover:border-destructive/80",
      },
      size: {
        default: "h-64 w-full p-6",
        sm: "h-32 w-full p-4",
        lg: "h-80 w-full p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ImageUploadProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageUploadVariants> {
  onImageSelect: (file: File) => void
  onImageRemove?: () => void
  value?: File | string
  disabled?: boolean
  accept?: string
  maxSize?: number
  multiple?: boolean
}

interface FileWithPreview extends File {
  preview?: string
}

const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  ({
    className,
    variant,
    size,
    onImageSelect,
    onImageRemove,
    value,
    disabled = false,
    accept = "image/*",
    maxSize = 10 * 1024 * 1024, // 10MB
    multiple = false,
    ...props
  }, ref) => {
    const [preview, setPreview] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [isFocused, setIsFocused] = React.useState<boolean>(false)

    const processFile = React.useCallback(
      (file: File) => {
        setError(null)
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError("Invalid file type. Please upload an image file.")
          return
        }
        
        // Validate file size
        if (file.size > maxSize) {
          setError(`File is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`)
          return
        }
        
        const fileWithPreview = file as FileWithPreview
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        fileWithPreview.preview = previewUrl
        setPreview(previewUrl)
        
        onImageSelect(fileWithPreview)
      },
      [maxSize, onImageSelect]
    )

    const onDrop = React.useCallback(
      (acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
          const rejection = rejectedFiles[0]
          if (rejection.errors[0]?.code === "file-too-large") {
            setError(`File is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`)
          } else if (rejection.errors[0]?.code === "file-invalid-type") {
            setError("Invalid file type. Please upload an image file.")
          } else {
            setError("File upload failed. Please try again.")
          }
          return
        }

        if (acceptedFiles.length > 0) {
          processFile(acceptedFiles[0])
        }
      },
      [maxSize, processFile]
    )

    const onPaste = React.useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault()
        
        const items = e.clipboardData.items
        
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
              processFile(file)
              return
            }
          }
        }
        
        setError("No image found in clipboard. Please copy an image first.")
      },
      [processFile]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'],
      },
      maxSize,
      multiple,
      disabled,
    })

    // Handle existing value (File or URL string)
    React.useEffect(() => {
      if (value) {
        if (typeof value === "string") {
          setPreview(value)
        } else if (value instanceof File) {
          const previewUrl = URL.createObjectURL(value)
          setPreview(previewUrl)
        }
      } else {
        setPreview(null)
      }
    }, [value])

    // Cleanup preview URL
    React.useEffect(() => {
      return () => {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview)
        }
      }
    }, [preview])

    const handleRemove = () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
      setPreview(null)
      setError(null)
      onImageRemove?.()
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
      <div className="w-full space-y-2">
        <div
          ref={ref}
          {...getRootProps()}
          tabIndex={disabled ? -1 : 0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPaste={onPaste}
          className={cn(
            imageUploadVariants({ variant: error ? "destructive" : variant, size }),
            {
              "cursor-pointer": !disabled,
              "cursor-not-allowed opacity-50": disabled,
              "border-primary bg-primary/5": isDragActive || isFocused,
              "border-destructive bg-destructive/5": error,
              "ring-2 ring-ring ring-offset-2": isFocused && !disabled,
            },
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                {isDragActive ? (
                  <Upload className="h-6 w-6 text-primary" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isDragActive
                    ? "Drop your image here"
                    : isFocused
                    ? "Paste an image (Ctrl+V)"
                    : "Upload an image"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isFocused
                    ? "You can paste an image from clipboard"
                    : "Drag and drop, click to browse, or paste"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max size: {formatFileSize(maxSize)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

ImageUpload.displayName = "ImageUpload"

export { ImageUpload, imageUploadVariants, type ImageUploadProps }