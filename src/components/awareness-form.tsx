"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAwarenessReport } from "@/app/farmer-awareness/actions";
import type { ReportResponse } from "@/app/farmer-awareness/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { AwarenessResult } from "./awareness-result";
import { useToast } from "@/hooks/use-toast";
import type { GenerateFarmerAwarenessReportOutput } from "@/ai/flows/generate-farmer-awareness-report";

const andhraPradeshDistricts = [
  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
  "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", 
  "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"
];

const formSchema = z.object({
  district: z.string({ required_error: "Please select a district."}).min(1, "Please select a district."),
});

export function AwarenessForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateFarmerAwarenessReportOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setResult(null);
    const formData = new FormData();
    formData.append("district", data.district);

    startTransition(async () => {
      const response: ReportResponse = await getAwarenessReport(formData);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          title: "Report Generation Failed",
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
          <CardTitle>Select Your District</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District in Andhra Pradesh</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {andhraPradeshDistricts.map(district => (
                           <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the district to get a tailored report.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isPending && (
         <div className="mt-8 text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Our AI is generating your detailed report... this may take a few moments.</p>
         </div>
      )}
      {result && !isPending && (
          <div className="mt-8">
              <AwarenessResult data={result} />
          </div>
      )}
    </>
  );
}
