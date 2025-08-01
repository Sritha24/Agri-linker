'use server';

import { predictFreshness, PredictFreshnessInput, PredictFreshnessOutput } from "@/ai/flows/produce-freshness-prediction";
import { z } from "zod";

// Note: Using string for date to pass through FormData easily
const formSchema = z.object({
  produceType: z.string().min(2, "Produce type must be at least 2 characters."),
  harvestDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format." }),
  storageConditions: z.string().min(1, "Storage condition is required."),
  description: z.string().optional(),
});

export type PredictionResponse = {
    success: boolean;
    message: string;
    data?: PredictFreshnessOutput;
    errors?: { field: string; message: string }[];
};

export async function getFreshnessPrediction(
    formData: FormData
): Promise<PredictionResponse> {
    const rawFormData = {
        produceType: formData.get("produceType"),
        harvestDate: formData.get("harvestDate"),
        storageConditions: formData.get("storageConditions"),
        description: formData.get("description"),
    };
    
    const validatedFields = formSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: validatedFields.error.issues.map(issue => ({ field: issue.path[0] as string, message: issue.message })),
        };
    }

    try {
        const input: PredictFreshnessInput = {
            ...validatedFields.data,
            // Format date to YYYY-MM-DD for the AI model
            harvestDate: new Date(validatedFields.data.harvestDate).toISOString().split('T')[0],
        };
        const result = await predictFreshness(input);
        return {
            success: true,
            message: "Prediction successful!",
            data: result,
        };
    } catch (error) {
        console.error("Freshness Prediction Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred while getting the prediction. Please try again later.",
        };
    }
}
