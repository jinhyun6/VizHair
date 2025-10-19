"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  href: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  popular = false,
  href
}: PricingCardProps) {
  
  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Payment integration will be available soon!");
  };
  return (
    <Card className={`relative overflow-hidden border-border bg-card ${
      popular ? 'ring-2 ring-primary' : ''
    }`}>
      {popular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-sm text-muted-foreground">/{period}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-primary mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={popular ? "default" : "outline"}
          onClick={handlePricingClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}