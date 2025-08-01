'use server';

import { predictPrice, PredictPriceInput, PredictPriceOutput } from "@/ai/flows/produce-price-prediction";
import { z } from "zod";

const formSchema = z.object({
  cropName: z.string().min(2, "Crop name must be at least 2 characters."),
  marketLocation: z.string().min(2, "Market location must be at least 2 characters."),
});

export type PredictionResponse = {
    success: boolean;
    message: string;
    data?: PredictPriceOutput;
    errors?: { field: string; message: string }[];
};

export async function getPricePrediction(
    formData: FormData
): Promise<PredictionResponse> {
    const rawFormData = {
        cropName: formData.get("cropName"),
        marketLocation: formData.get("marketLocation"),
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
        const input: PredictPriceInput = validatedFields.data;
        const result = await predictPrice(input);
        return {
            success: true,
            message: "Prediction successful!",
            data: result,
        };
    } catch (error) {
        console.error("Price Prediction Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred while getting the prediction. Please try again later.",
        };
    }
}
