"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureCard } from "@/components/common/FeatureCard";
import { PricingCard } from "@/components/common/PricingCard";
import { EmailSignup } from "@/components/common/EmailSignup";
import { ImageUpload } from "@/components/ui/image-upload";
import { ResultImage } from "@/components/ui/result-image";

export default function DemoPage() {
  const handleImageSelect = (file: File) => {
    console.log("Selected file:", file.name, file.size);
  };

  const handleImageRemove = () => {
    console.log("Image removed");
  };

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handleRegenerate = () => {
    console.log("Regenerate clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/50 py-8">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <h1 className="text-3xl font-bold text-foreground text-center">
            🎨 Component Demo Page
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            All components showcase - globals.css theme integration test
          </p>
        </div>
      </div>

      {/* Layout Components Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">📱 Layout Components</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Header Component</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <Header />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Footer Component</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Components */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">🏗️ Section Components</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Hero Section</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <HeroSection />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Features Section</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <FeaturesSection />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Pricing Section</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <PricingSection />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">CTA Section</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <CTASection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Components */}
      <section className="py-12">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">🧩 Common Components</h2>
          
          <div className="space-y-12">
            {/* Feature Cards */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Feature Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                  title="Lightning Fast"
                  description="Generate stunning hairstyle transformations in under 10 seconds."
                />
                <FeatureCard
                  icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  title="Privacy First"
                  description="Your photos are processed securely and never stored."
                />
                <FeatureCard
                  icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  }
                  title="Easy to Use"
                  description="Simple three-step process: upload, choose, download."
                />
              </div>
            </div>

            {/* Pricing Cards */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Pricing Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PricingCard
                  title="Starter"
                  price="$9"
                  period="month"
                  description="Perfect for trying out different styles"
                  features={["5 AI generations", "Standard resolution", "Email support"]}
                  buttonText="Get Started"
                  href="/signup?plan=starter"
                />
                <PricingCard
                  title="Popular"
                  price="$19"
                  period="month"
                  description="Most popular choice for style enthusiasts"
                  features={["25 AI generations", "High resolution", "Priority support", "Color customization"]}
                  buttonText="Choose Popular"
                  popular={true}
                  href="/signup?plan=popular"
                />
                <PricingCard
                  title="Pro"
                  price="$39"
                  period="month"
                  description="For professionals and style creators"
                  features={["100 AI generations", "Ultra-high resolution", "Commercial license", "API access"]}
                  buttonText="Go Pro"
                  href="/signup?plan=pro"
                />
              </div>
            </div>

            {/* Email Signup */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Email Signup Variations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Default Newsletter</h4>
                  <EmailSignup />
                </div>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Early Access</h4>
                  <EmailSignup 
                    placeholder="Get early access"
                    buttonText="Join Waitlist"
                    description="Be the first to try new AI features."
                  />
                </div>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Beta Testing</h4>
                  <EmailSignup 
                    placeholder="Beta tester email"
                    buttonText="Apply"
                    description="Help us test cutting-edge features."
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Image Upload Component</h3>
              <div className="space-y-8">
                {/* Basic Image Upload */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Default Size</h4>
                  <ImageUpload 
                    onImageSelect={handleImageSelect}
                    onImageRemove={handleImageRemove}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Default size with 10MB limit. Supports drag & drop and click to upload.
                  </p>
                </div>

                {/* Size Variations */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Size Variations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium text-card-foreground mb-3">Small (sm)</h5>
                      <ImageUpload 
                        size="sm"
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                      />
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium text-card-foreground mb-3">Default</h5>
                      <ImageUpload 
                        size="default"
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                      />
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium text-card-foreground mb-3">Large (lg)</h5>
                      <ImageUpload 
                        size="lg"
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                      />
                    </div>
                  </div>
                </div>

                {/* Special Features */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Special Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium text-card-foreground mb-3">Small File Limit (2MB)</h5>
                      <ImageUpload 
                        maxSize={2 * 1024 * 1024}
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Limited to 2MB for testing error handling
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h5 className="font-medium text-card-foreground mb-3">Disabled State</h5>
                      <ImageUpload 
                        disabled={true}
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Disabled upload component
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Image Component */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Result Image Component</h3>
              <div className="space-y-8">
                {/* Loading State */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Loading State</h4>
                  <div className="max-w-md mx-auto">
                    <ResultImage
                      isLoading={true}
                      onDownload={handleDownload}
                      onRegenerate={handleRegenerate}
                    />
                  </div>
                </div>

                {/* Success State */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Success State</h4>
                  <div className="max-w-md mx-auto">
                    <ResultImage
                      resultImage="https://images.unsplash.com/photo-1494790108755-2616b332446c?w=400&h=400&fit=crop&crop=face"
                      onDownload={handleDownload}
                      onRegenerate={handleRegenerate}
                    />
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Before/After Comparison</h4>
                  <div className="max-w-md mx-auto">
                    <ResultImage
                      originalImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      resultImage="https://images.unsplash.com/photo-1494790108755-2616b332446c?w=400&h=400&fit=crop&crop=face"
                      showComparison={true}
                      onDownload={handleDownload}
                      onRegenerate={handleRegenerate}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Toggle between original and result using the eye button
                  </p>
                </div>

                {/* Error State */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Error State</h4>
                  <div className="max-w-md mx-auto">
                    <ResultImage
                      isError={true}
                      errorMessage="Failed to generate hairstyle. Please try again."
                      onDownload={handleDownload}
                      onRegenerate={handleRegenerate}
                    />
                  </div>
                </div>

                {/* Different Sizes */}
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-4">Size Variations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-card-foreground mb-3 text-center">Square (default)</h5>
                      <ResultImage
                        size="default"
                        resultImage="https://images.unsplash.com/photo-1494790108755-2616b332446c?w=300&h=300&fit=crop&crop=face"
                        onDownload={handleDownload}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-card-foreground mb-3 text-center">Wide (16:9)</h5>
                      <ResultImage
                        size="wide"
                        resultImage="https://images.unsplash.com/photo-1494790108755-2616b332446c?w=400&h=225&fit=crop&crop=face"
                        onDownload={handleDownload}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-card-foreground mb-3 text-center">Tall (3:4)</h5>
                      <ResultImage
                        size="tall"
                        resultImage="https://images.unsplash.com/photo-1494790108755-2616b332446c?w=300&h=400&fit=crop&crop=face"
                        onDownload={handleDownload}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Test Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">🎨 Theme Integration Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-background border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Background</h4>
              <p className="text-muted-foreground text-sm">bg-background</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <h4 className="font-semibold text-card-foreground mb-2">Card</h4>
              <p className="text-muted-foreground text-sm">bg-card</p>
            </div>
            <div className="p-6 bg-primary text-primary-foreground border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Primary</h4>
              <p className="text-primary-foreground/80 text-sm">bg-primary</p>
            </div>
            <div className="p-6 bg-secondary text-secondary-foreground border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Secondary</h4>
              <p className="text-secondary-foreground/80 text-sm">bg-secondary</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-card border border-border rounded-lg">
            <h4 className="font-semibold text-card-foreground mb-4">Color Palette Test</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm text-muted-foreground">Primary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded"></div>
                <span className="text-sm text-muted-foreground">Secondary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span className="text-sm text-muted-foreground">Muted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-destructive rounded"></div>
                <span className="text-sm text-muted-foreground">Destructive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-border rounded"></div>
                <span className="text-sm text-muted-foreground">Border</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-8 bg-primary/5 border-t border-border">
        <div className="container mx-auto max-w-screen-2xl px-4 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">💡 Usage Instructions</h3>
          <p className="text-muted-foreground text-sm">
            Toggle between light/dark mode to see how globals.css theme affects all components. 
            All colors, borders, and backgrounds automatically adapt to the theme.
          </p>
        </div>
      </section>
    </div>
  );
}