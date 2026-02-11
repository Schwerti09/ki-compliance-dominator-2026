import Hero from "@/components/marketing/Hero";
import TrustBadges from "@/components/marketing/TrustBadges";
import FeaturesGrid from "@/components/marketing/FeaturesGrid";
import PricingPreview from "@/components/marketing/PricingPreview";
import BlogPreview from "@/components/marketing/BlogPreview";
import CTA from "@/components/marketing/CTA";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container py-10">
        <TrustBadges />
      </div>
      <FeaturesGrid />
      <PricingPreview />
      <BlogPreview />
      <CTA />
    </div>
  );
}
