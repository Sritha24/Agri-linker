'use server';

/**
 * @fileOverview Predicts the market price of produce.
 *
 * - predictPrice - A function that handles the price prediction process.
 * - PredictPriceInput - The input type for the predictPrice function.
 * - PredictPriceOutput - The return type for the predictPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPriceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  marketLocation: z.string().describe('The market location (e.g., city, state).'),
});
export type PredictPriceInput = z.infer<typeof PredictPriceInputSchema>;

const PredictPriceOutputSchema = z.object({
    predictedPrice: z.string().describe('The predicted price per kg in Indian Rupees (₹).'),
    marketExpectedPrice: z.string().describe('The expected market price based on current trends, in Indian Rupees (₹).'),
    priceRange: z.string().describe('The likely price range (e.g., ₹45-₹55).'),
    analysis: z.string().describe('A brief analysis of the market conditions and factors influencing the price.'),
});
export type PredictPriceOutput = z.infer<typeof PredictPriceOutputSchema>;

export async function predictPrice(input: PredictPriceInput): Promise<PredictPriceOutput> {
  return predictPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'producePricePrompt',
  input: {schema: PredictPriceInputSchema},
  output: {schema: PredictPriceOutputSchema},
  prompt: `You are an agricultural market analyst AI. Your task is to predict the market price for a given crop in a specific location in India.

  Based on the following information, provide a predicted price per kg, an expected market price based on trends, a likely price range, and a brief market analysis. All prices should be in Indian Rupees (₹).

  Crop Name: {{{cropName}}}
  Market Location: {{{marketLocation}}}

  Consider factors like seasonality, demand, recent trends, and typical market prices for this crop in the specified region. Provide the output in a structured format as described in the output schema.
  `,
});

const predictPriceFlow = ai.defineFlow(
  {
    name: 'predictPriceFlow',
    inputSchema: PredictPriceInputSchema,
    outputSchema: PredictPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
