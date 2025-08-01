
'use server';

import { GenerateFarmerAwarenessReportInput, GenerateFarmerAwarenessReportOutput } from "@/ai/flows/generate-farmer-awareness-report";
import { z } from "zod";

const formSchema = z.object({
  district: z.string().min(1, "Please select a district."),
});

export type ReportResponse = {
    success: boolean;
    message: string;
    data?: GenerateFarmerAwarenessReportOutput;
    errors?: { field: string; message: string }[];
};

// A pre-written report to be used as a fallback.
const getStaticReport = (district: string): GenerateFarmerAwarenessReportOutput => {
    return {
        marketTalk: `In ${district}, the current market is seeing high demand for leafy greens and staple vegetables like tomatoes and onions. Prices for exotic vegetables are slightly higher than average due to transportation costs. It is advisable for farmers to focus on quick-turnaround crops to capitalize on the current market stability.`,
        weather: `The forecast for ${district} over the next 7 days predicts partly cloudy skies with a 30% chance of isolated thunderstorms in the afternoons. Temperatures will range from 28°C to 34°C. Humidity will remain high, around 75-85%. Farmers should ensure proper drainage in fields to avoid waterlogging.`,
        cropRecommendations: [
            "Paddy (Rice)", "Cotton", "Red Chilli", "Turmeric", "Maize"
        ],
        governmentPolicies: [
            {
                name: "YSR Rythu Bharosa",
                description: "This scheme provides financial assistance to farmer families, including tenant farmers, at ₹13,500 per year to support them in meeting investment costs during the crop season.",
                link: "https://ysrrythubharosa.ap.gov.in/"
            },
            {
                name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
                description: "A central government scheme that provides income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
                link: "https://pmkisan.gov.in/"
            },
            {
                name: "Dr. YSR Free Crop Insurance Scheme",
                description: "The state government pays the entire premium on behalf of farmers for insuring their crops, providing relief in case of crop loss due to natural calamities.",
                link: "https://karshak.ap.gov.in/ysr-crop-insurance/"
            }
        ]
    };
}


export async function getAwarenessReport(
    formData: FormData
): Promise<ReportResponse> {
    const rawFormData = {
        district: formData.get("district"),
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
        // We will return a static report instead of calling the AI.
        const input: GenerateFarmerAwarenessReportInput = validatedFields.data;
        const result = getStaticReport(input.district);
        
        // Simulate a short delay to mimic processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            success: true,
            message: "Report generated successfully!",
            data: result,
        };
    } catch (error) {
        console.error("Farmer Awareness Report Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred while generating the report. Please try again later.",
        };
    }
}
