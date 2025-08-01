import type { PredictPriceOutput } from "@/ai/flows/produce-price-prediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, LineChart, TrendingUp, BarChart } from "lucide-react";

interface PriceResultProps {
    data: PredictPriceOutput;
}

export function PriceResult({ data }: PriceResultProps) {
    return (
        <Card className="animate-in fade-in-50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">AI Price Prediction Report</CardTitle>
                <CardDescription>This is an AI-generated estimate based on market data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    <div>
                        <h3 className="font-medium flex items-center justify-center gap-2 text-muted-foreground"><IndianRupee className="h-5 w-5 text-accent"/> Predicted Price (per kg)</h3>
                        <p className="text-4xl font-bold text-primary py-2">{data.predictedPrice}</p>
                    </div>
                    <div>
                        <h3 className="font-medium flex items-center justify-center gap-2 text-muted-foreground"><BarChart className="h-5 w-5 text-accent"/> Market Expected Price</h3>
                        <p className="text-4xl font-bold text-primary py-2">{data.marketExpectedPrice}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                    <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-2 text-muted-foreground"><TrendingUp className="h-5 w-5 text-accent"/> Price Range</h3>
                        <p className="text-2xl font-semibold">{data.priceRange}</p>
                    </div>
                    <div className="space-y-2">
                         <h3 className="font-medium flex items-center gap-2 text-muted-foreground"><LineChart className="h-5 w-5 text-accent"/> Market Analysis</h3>
                        <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md border">{data.analysis}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
