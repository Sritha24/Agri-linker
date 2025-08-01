import { FreshnessForm } from "@/components/freshness-form";
import { Bot } from "lucide-react";

export default function FreshnessPredictorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-primary/20 text-primary p-4 rounded-full">
          <Bot className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Produce Freshness Predictor
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Fill in the details of your produce below, and our AI will provide an estimated freshness score and shelf life.
        </p>
      </div>

      <div className="mt-12">
        <FreshnessForm />
      </div>
    </div>
  );
}
