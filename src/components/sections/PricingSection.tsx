import { PricingCard } from "@/components/common/PricingCard";

export function PricingSection() {
  const plans = [
    {
      title: "Starter",
      price: "$9",
      period: "month",
      description: "Perfect for trying out different styles",
      features: [
        "5 AI hairstyle generations",
        "Standard resolution downloads",
        "Basic style categories",
        "Email support",
        "24-hour processing"
      ],
      buttonText: "Get Started",
      href: "/signup?plan=starter"
    },
    {
      title: "Popular",
      price: "$19",
      period: "month", 
      description: "Most popular choice for style enthusiasts",
      features: [
        "25 AI hairstyle generations",
        "High resolution downloads",
        "All style categories",
        "Priority email support",
        "Instant processing",
        "Color customization",
        "Style recommendations"
      ],
      buttonText: "Choose Popular",
      popular: true,
      href: "/signup?plan=popular"
    },
    {
      title: "Pro",
      price: "$39",
      period: "month",
      description: "For professionals and style creators",
      features: [
        "100 AI hairstyle generations",
        "Ultra-high resolution downloads",
        "All premium styles",
        "Priority phone & email support",
        "Instant processing",
        "Advanced color tools",
        "Bulk processing",
        "Commercial license",
        "API access"
      ],
      buttonText: "Go Pro",
      href: "/signup?plan=pro"
    }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your style needs. Upgrade or downgrade at any time.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
                popular={plan.popular}
                href={plan.href}
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
          </div>
          <div className="mt-12 space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                Can I cancel my subscription anytime?
              </h4>
              <p className="mt-2 text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                Do unused generations roll over?
              </h4>
              <p className="mt-2 text-muted-foreground">
                Unused generations expire at the end of each billing cycle. We recommend choosing a plan that matches your monthly usage.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                Is there a free trial?
              </h4>
              <p className="mt-2 text-muted-foreground">
                Yes! New users get 1 free hairstyle generation to try our service. Additional generations will be available through our payment plans (coming soon).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}