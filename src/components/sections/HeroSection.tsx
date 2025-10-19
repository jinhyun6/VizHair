import { Button } from "@/components/ui/button";
import { DemoVideo } from "@/components/ui/demo-video";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden section-gradient section-padding">
      <div className="container-enhanced">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Transform Your Look with{" "}
            <span className="text-primary">AI-Powered</span> Hairstyles
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Upload your photo and see yourself in any hairstyle instantly. 
            Our advanced AI generates realistic results in seconds, helping you 
            discover your perfect look before making any changes.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/dashboard">Try It Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#demo">
                Watch Demo
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </Button>
          </div>
          
          {/* Demo Video */}
          <div className="mt-16 flow-root sm:mt-24">
            <DemoVideo />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Hairstyles Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">&lt;10s</div>
              <div className="text-sm text-muted-foreground">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}