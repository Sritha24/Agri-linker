import { PriceForm } from "@/components/price-form";
import { Receipt } from "lucide-react";

export default function PricePredictorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-primary/20 text-primary p-4 rounded-full">
          <Receipt className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Crop Price Predictor
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Enter the crop and market location to get an AI-powered price prediction.
        </p>
      </div>

      <div className="mt-12">
        <PriceForm />
      </div>
    </div>
  );
}
