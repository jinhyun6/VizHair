import { FeatureCard } from "@/components/common/FeatureCard";
import { Zap, Image, Palette, Shield, Heart, Download } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Generate stunning hairstyle transformations in under 10 seconds with our advanced AI technology."
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Realistic Results",
      description: "See yourself with photorealistic hairstyles that perfectly match your face shape and features."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Endless Styles",
      description: "Choose from hundreds of hairstyles including trendy cuts, classic looks, and bold transformations."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your photos are processed securely and never stored. Complete privacy and data protection guaranteed."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Easy to Use",
      description: "Simple three-step process: upload your photo, choose a style, and download your new look."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "High Quality",
      description: "Download high-resolution images perfect for sharing or showing your stylist exactly what you want."
    }
  ];

  return (
    <section id="features" className="section-padding section-gradient">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to discover your perfect hairstyle with confidence.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}