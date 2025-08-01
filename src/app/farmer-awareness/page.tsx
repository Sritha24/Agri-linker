import { AwarenessForm } from "@/components/awareness-form";
import { BookUser } from "lucide-react";

export default function FarmerAwarenessPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-primary/20 text-primary p-4 rounded-full">
          <BookUser className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Farmer Awareness Hub
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Your AI-powered guide for farming in Andhra Pradesh. Select your district to get tailored advice on crops, market trends, weather, and government schemes.
        </p>
      </div>

      <div className="mt-12">
        <AwarenessForm />
      </div>
    </div>
  );
}
