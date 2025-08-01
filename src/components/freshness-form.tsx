"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFreshnessPrediction } from "@/app/freshness-predictor/actions";
import type { PredictionResponse } from "@/app/freshness-predictor/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { FreshnessResult } from "./freshness-result";
import { useToast } from "@/hooks/use-toast";
import type { PredictFreshnessOutput } from "@/ai/flows/produce-freshness-prediction";

const formSchema = z.object({
  produceType: z.string().min(2, "Produce type must be at least 2 characters."),
  harvestDate: z.date({ required_error: "A harvest date is required." }),
  storageConditions: z.enum(["Refrigerated", "Room Temperature", "Controlled Atmosphere", "Other"], { required_error: "Please select storage conditions." }),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
});

export function FreshnessForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PredictFreshnessOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceType: "",
      storageConditions: undefined,
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setResult(null);
    const formData = new FormData();
    formData.append("produceType", data.produceType);
    formData.append("harvestDate", data.harvestDate.toISOString());
    formData.append("storageConditions", data.storageConditions);
    if(data.description) formData.append("description", data.description);

    startTransition(async () => {
      const response: PredictionResponse = await getFreshnessPrediction(formData);
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
          <CardTitle>Produce Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="produceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produce Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Organic Strawberries" {...field} />
                    </FormControl>
                    <FormDescription>The name or type of the produce.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harvestDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Harvest Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2020-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>The date the produce was picked.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storageConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Conditions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage conditions" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="Room Temperature">Room Temperature</SelectItem>
                        <SelectItem value="Controlled Atmosphere">Controlled Atmosphere</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How the produce has been stored since harvest.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional: Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., No pesticides used, slight bruising on a few items..."
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>Any other relevant information about the produce.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Prediction
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isPending && (
         <div className="mt-8 text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Our AI is analyzing your produce... this may take a moment.</p>
         </div>
      )}
      {result && !isPending && (
          <div className="mt-8">
              <FreshnessResult data={result} />
          </div>
      )}
    </>
  );
}
