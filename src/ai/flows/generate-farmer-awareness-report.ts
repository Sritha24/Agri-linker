'use server';

/**
 * @fileOverview Generates a detailed awareness report for farmers in a specific district of Andhra Pradesh.
 *
 * - generateFarmerAwarenessReport - The main function to generate the report.
 * - GenerateFarmerAwarenessReportInput - The input type for the function.
 * - GenerateFarmerAwarenessReportOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFarmerAwarenessReportInputSchema = z.object({
  district: z.string().describe('The district in Andhra Pradesh for which the report is being generated.'),
});
export type GenerateFarmerAwarenessReportInput = z.infer<typeof GenerateFarmerAwarenessReportInputSchema>;

const PolicySchema = z.object({
    name: z.string().describe("The name of the government policy or scheme."),
    description: z.string().describe("A brief description of the policy."),
    link: z.string().url().describe("An official link for more details."),
});

const GenerateFarmerAwarenessReportOutputSchema = z.object({
    marketTalk: z.string().describe("An analysis of the current agricultural market conditions in the specified district."),
    weather: z.string().describe("A summary of the current weather and a short-term forecast for the district."),
    cropRecommendations: z.array(z.string()).describe("A list of crops suitable for cultivation in the district based on the season and soil conditions."),
    governmentPolicies: z.array(PolicySchema).describe("A list of relevant government policies and schemes for farmers in the region.")
});
export type GenerateFarmerAwarenessReportOutput = z.infer<typeof GenerateFarmerAwarenessReportOutputSchema>;


export async function generateFarmerAwarenessReport(input: GenerateFarmerAwarenessReportInput): Promise<GenerateFarmerAwarenessReportOutput> {
  return farmerAwarenessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'farmerAwarenessPrompt',
  input: {schema: GenerateFarmerAwarenessReportInputSchema},
  output: {schema: GenerateFarmerAwarenessReportOutputSchema},
  prompt: `You are an expert agricultural advisor for Andhra Pradesh, India.
  Your task is to generate a detailed report for farmers in the specified district: {{{district}}}.

  Please provide the following information:
  1. Market Talk: A brief analysis of current agricultural market trends in this district.
  2. Weather: A summary of the current weather conditions and a forecast for the next 7 days.
  3. Crop Recommendations: Based on the Kharif season, recommend at least 5 suitable crops for the '{{{district}}}' district.
  4. Government Policies: List at least 3 relevant government schemes for farmers. For each, provide its name, description, and an official link.

  Generate the output in the structured format described by the output schema.
  `,
});

const farmerAwarenessFlow = ai.defineFlow(
  {
    name: 'farmerAwarenessFlow',
    inputSchema: GenerateFarmerAwarenessReportInputSchema,
    outputSchema: GenerateFarmerAwarenessReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
