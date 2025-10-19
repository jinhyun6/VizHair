"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/ui/image-upload";
import { ResultImage } from "@/components/ui/result-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Sparkles, Download, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { session, user, loading, credits, refreshCredits } = useAuth();
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [hairstyleImage, setHairstyleImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [resultImageData, setResultImageData] = useState<{ data: string; mimeType: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 인증 체크 및 리다이렉트
  useEffect(() => {
    if (!loading) {
      if (!user || !session) {
        router.push('/login');
      }
    }
  }, [user, session, loading, router]);

  // 로딩 중이거나 인증되지 않은 경우 로딩 화면 표시
  if (loading || !user || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleFaceImageSelect = (file: File) => {
    setFaceImage(file);
    console.log("Face image selected:", file.name, file.size);
  };

  const handleFaceImageRemove = () => {
    setFaceImage(null);
    console.log("Face image removed");
  };

  const handleHairstyleImageSelect = (file: File) => {
    setHairstyleImage(file);
    console.log("Hairstyle image selected:", file.name, file.size);
  };

  const handleHairstyleImageRemove = () => {
    setHairstyleImage(null);
    console.log("Hairstyle image removed");
  };

  const handleGenerateHairstyle = async () => {
    if (!faceImage || !hairstyleImage || !session) return;
    
    setIsProcessing(true);
    setError(null);
    setResultImageUrl(null);
    setResultImageData(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('faceImage', faceImage);
      formData.append('hairstyleImage', hairstyleImage);

      // Call API
      const response = await fetch('/api/generate-hairstyle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate hairstyle');
      }

      // Success - set result image data
      if (data.imageData && data.mimeType) {
        setResultImageData({ data: data.imageData, mimeType: data.mimeType });
        // Create data URL for display
        const dataUrl = `data:${data.mimeType};base64,${data.imageData}`;
        setResultImageUrl(dataUrl);
        console.log('Hairstyle generation completed, image size:', data.imageData.length, 'characters');
        
        // Refresh credits after successful generation 
        //await refreshCredits();
      // TODO: Fix getUserCredits RLS issue
      } else {
        throw new Error('Invalid response format: missing image data');
      }

    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultImageData) return;
    
    // Convert base64 to blob
    const byteCharacters = atob(resultImageData.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: resultImageData.mimeType });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hairstyle-result-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = () => {
    // Clear previous result and regenerate
    setResultImageUrl(null);
    setResultImageData(null);
    setError(null);
    handleGenerateHairstyle();
  };

  const canGenerate = faceImage && hairstyleImage && !isProcessing && session;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Upload your photo and a hairstyle image to create your new look
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>{credits} {credits === 1 ? 'credit' : 'credits'} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          
          {/* Upload Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Face Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>1. Upload Your Face Photo</span>
                </CardTitle>
                <CardDescription>
                  Upload a clear photo of your face. Best results with front-facing photos and good lighting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageSelect={handleFaceImageSelect}
                  onImageRemove={handleFaceImageRemove}
                  value={faceImage}
                />
                
                {faceImage && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {faceImage.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(faceImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hairstyle Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>2. Upload Hairstyle Reference</span>
                </CardTitle>
                <CardDescription>
                  Upload a photo of the hairstyle you want to try. This will be applied to your face photo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageSelect={handleHairstyleImageSelect}
                  onImageRemove={handleHairstyleImageRemove}
                  value={hairstyleImage}
                />
                
                {hairstyleImage && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {hairstyleImage.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(hairstyleImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Generate Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className={`flex items-center space-x-2 ${faceImage ? 'text-green-600' : 'text-muted-foreground'}`}>
                <div className={`w-2 h-2 rounded-full ${faceImage ? 'bg-green-600' : 'bg-muted-foreground'}`}></div>
                <span>Face photo {faceImage ? 'uploaded' : 'needed'}</span>
              </div>
              <div className={`flex items-center space-x-2 ${hairstyleImage ? 'text-green-600' : 'text-muted-foreground'}`}>
                <div className={`w-2 h-2 rounded-full ${hairstyleImage ? 'bg-green-600' : 'bg-muted-foreground'}`}></div>
                <span>Hairstyle photo {hairstyleImage ? 'uploaded' : 'needed'}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleGenerateHairstyle}
                disabled={!canGenerate || credits === 0}
                size="lg"
                className="px-8"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {isProcessing ? 'Generating...' : 'Generate My New Look'}
              </Button>
              
              {credits === 0 && (
                <p className="text-sm text-red-600">
                  You have no credits remaining. Purchase more credits to generate hairstyles.
                </p>
              )}
              
              {!canGenerate && !isProcessing && credits > 0 && (
                <p className="text-sm text-muted-foreground">
                  Please upload both images to generate your new hairstyle
                </p>
              )}
              
              {isProcessing && (
                <p className="text-sm text-muted-foreground">
                  AI is working on your new look...
                </p>
              )}
            </div>
          </div>

          {/* Result Section */}
          {(resultImageUrl || isProcessing || error) && (
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-md mx-auto">
                  <ResultImage
                    resultImage={resultImageUrl || undefined}
                    isLoading={isProcessing}
                    isError={!!error}
                    errorMessage={error || undefined}
                    onDownload={handleDownload}
                    onRegenerate={() => handleRegenerate()}
                    showComparison={!!resultImageUrl}
                    originalImage={faceImage ? URL.createObjectURL(faceImage) : undefined}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📸 Face Photo Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Use a clear, front-facing photo with good lighting
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Make sure your face is clearly visible and unobstructed
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Avoid extreme angles or heavy shadows
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✨ Hairstyle Photo Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Choose photos with clear, well-defined hairstyles
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Front or side views work best for style transfer
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Higher resolution images produce better results
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}