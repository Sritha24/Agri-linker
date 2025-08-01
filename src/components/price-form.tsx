"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPricePrediction } from "@/app/price-predictor/actions";
import type { PredictionResponse } from "@/app/price-predictor/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { PriceResult } from "./price-result";
import { useToast } from "@/hooks/use-toast";
import type { PredictPriceOutput } from "@/ai/flows/produce-price-prediction";

const formSchema = z.object({
  cropName: z.string().min(2, "Crop name must be at least 2 characters."),
  marketLocation: z.string().min(2, "Market location must be at least 2 characters."),
});

export function PriceForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PredictPriceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      marketLocation: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setResult(null);
    const formData = new FormData();
    formData.append("cropName", data.cropName);
    formData.append("marketLocation", data.marketLocation);

    startTransition(async () => {
      const response: PredictionResponse = await getPricePrediction(formData);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          title: "Prediction Failed",
          description: response.message,
          variant: "destructive",
        });
        if(response.errors) {
            response.errors.forEach(err => {
                form.setError(err.field as keyof z.infer<typeof formSchema>, {message: err.message});
            });
        }
      }
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Crop & Market Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cropName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alphonso Mango" {...field} />
                    </FormControl>
                    <FormDescription>The specific name of the crop.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="marketLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, Maharashtra" {...field} />
                    </FormControl>
                    <FormDescription>The city or region of the market.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Predict Price
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isPending && (
         <div className="mt-8 text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Our AI is analyzing the market... this may take a moment.</p>
         </div>
      )}
      {result && !isPending && (
          <div className="mt-8">
              <PriceResult data={result} />
          </div>
      )}
    </>
  );
}
