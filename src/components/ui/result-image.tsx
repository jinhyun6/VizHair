"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Download, RefreshCw, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const resultImageVariants = cva(
  "relative overflow-hidden rounded-lg border border-border",
  {
    variants: {
      variant: {
        default: "bg-card",
        loading: "bg-muted/50 animate-pulse",
        error: "bg-destructive/5 border-destructive/20",
      },
      size: {
        default: "aspect-square",
        wide: "aspect-video", 
        tall: "aspect-[3/4]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ResultImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resultImageVariants> {
  originalImage?: string
  resultImage?: string
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  onDownload?: () => void
  onRegenerate?: () => void
  showComparison?: boolean
}

const ResultImage = React.forwardRef<HTMLDivElement, ResultImageProps>(
  ({
    className,
    variant,
    size,
    originalImage,
    resultImage,
    isLoading = false,
    isError = false,
    errorMessage = "Failed to generate image",
    onDownload,
    onRegenerate,
    showComparison = false,
    ...props
  }, ref) => {
    const [showBefore, setShowBefore] = React.useState(false)
    const [imageLoaded, setImageLoaded] = React.useState(false)

    // Reset image loaded state when result changes
    React.useEffect(() => {
      setImageLoaded(false)
    }, [resultImage])

    const handleDownload = () => {
      if (resultImage && onDownload) {
        onDownload()
      }
    }

    const toggleComparison = () => {
      if (originalImage && resultImage) {
        setShowBefore(!showBefore)
      }
    }

    const currentImage = showComparison && showBefore ? originalImage : resultImage

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Generated Result</span>
            </span>
            {showComparison && originalImage && resultImage && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleComparison}
                className="ml-2"
              >
                {showBefore ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Show Result
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Show Original
                  </>
                )}
              </Button>
            )}
          </CardTitle>
          {resultImage && (
            <CardDescription>
              {showComparison && showBefore 
                ? "Original image" 
                : "Your new hairstyle is ready!"}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Image Display Area */}
          <div className={cn(
            resultImageVariants({ 
              variant: isLoading ? "loading" : isError ? "error" : variant, 
              size 
            })
          )}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Generating your new look...</p>
                    <p className="text-sm text-muted-foreground">This may take up to 30 seconds</p>
                  </div>
                </div>
              </div>
            ) : isError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                  <div>
                    <p className="font-medium text-foreground">Generation Failed</p>
                    <p className="text-sm text-muted-foreground">{errorMessage}</p>
                  </div>
                </div>
              </div>
            ) : currentImage ? (
              <>
                <img
                  src={currentImage}
                  alt={showBefore ? "Original image" : "Generated hairstyle"}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                
                {/* Overlay for comparison mode */}
                {showComparison && (
                  <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    {showBefore ? "BEFORE" : "AFTER"}
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Sparkles className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No image generated yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {resultImage && !isLoading && !isError && (
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={handleDownload}
                disabled={!resultImage}
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              
              {onRegenerate && (
                <Button
                  variant="outline"
                  onClick={onRegenerate}
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              )}
            </div>
          )}

          {/* Error Actions */}
          {isError && onRegenerate && (
            <div className="flex items-center justify-center">
              <Button
                onClick={onRegenerate}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ResultImage.displayName = "ResultImage"

export { ResultImage, resultImageVariants, type ResultImageProps }