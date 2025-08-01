'use server';

/**
 * @fileOverview Predicts the freshness of produce based on farmer input.
 *
 * - predictFreshness - A function that handles the freshness prediction process.
 * - PredictFreshnessInput - The input type for the predictFreshness function.
 * - PredictFreshnessOutput - The return type for the predictFreshness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFreshnessInputSchema = z.object({
  produceType: z.string().describe('The type of produce.'),
  harvestDate: z.string().describe('The date the produce was harvested (YYYY-MM-DD).'),
  storageConditions: z
    .string()
    .describe('The storage conditions of the produce (e.g., refrigerated, room temperature).'),
  description: z.string().optional().describe('Optional: Additional details about the produce.'),
});
export type PredictFreshnessInput = z.infer<typeof PredictFreshnessInputSchema>;

const PredictFreshnessOutputSchema = z.object({
  freshnessScore: z
    .number()
    .describe('A numerical score (0-100) indicating the freshness of the produce.'),
  estimatedShelfLife: z
    .string()
    .describe('An estimated shelf life of the produce (e.g., 5-7 days).'),
  optimalConsumptionDate: z
    .string()
    .describe('The estimated date for optimal consumption (YYYY-MM-DD).'),
  recommendations: z.string().describe('Recommendations for storing and consuming the produce.'),
});
export type PredictFreshnessOutput = z.infer<typeof PredictFreshnessOutputSchema>;

export async function predictFreshness(input: PredictFreshnessInput): Promise<PredictFreshnessOutput> {
  return predictFreshnessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'produceFreshnessPrompt',
  input: {schema: PredictFreshnessInputSchema},
  output: {schema: PredictFreshnessOutputSchema},
  prompt: `You are an AI assistant specializing in predicting the freshness of produce.

  Based on the following information, provide a freshness score (0-100), estimated shelf life, optimal consumption date, and storage/consumption recommendations.

  Produce Type: {{{produceType}}}
  Harvest Date: {{{harvestDate}}}
  Storage Conditions: {{{storageConditions}}}
  Description: {{{description}}}

  Please provide the output in a structured format as described in the output schema.
  `,
});

const predictFreshnessFlow = ai.defineFlow(
  {
    name: 'predictFreshnessFlow',
    inputSchema: PredictFreshnessInputSchema,
    outputSchema: PredictFreshnessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
