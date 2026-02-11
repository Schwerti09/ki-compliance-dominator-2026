import FeaturesGrid from "@/components/marketing/FeaturesGrid";

export default function FeaturesPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Features</h1>
        <p className="mt-3 text-white/70">
          EU AI Act & ISO 42001 sind weniger “Dokumente” und mehr “Systemzustand”. Diese Plattform behandelt beides.
        </p>
      </div>
      <div className="mt-10">
        <FeaturesGrid />
      </div>
    </div>
  );
}
