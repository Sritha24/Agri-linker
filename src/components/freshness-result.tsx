import type { PredictFreshnessOutput } from "@/ai/flows/produce-freshness-prediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, Leaf, Package, Thermometer } from "lucide-react";
import { format } from "date-fns";
import React from 'react';

interface FreshnessResultProps {
    data: PredictFreshnessOutput;
}

export function FreshnessResult({ data }: FreshnessResultProps) {
    const getScoreColorClass = (score: number) => {
        if (score >= 80) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    }

    return (
        <Card className="animate-in fade-in-50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">AI Freshness Report</CardTitle>
                <CardDescription>This is an AI-generated estimate based on the provided data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-medium flex items-center gap-2"><Leaf className="h-5 w-5 text-primary"/> Freshness Score</h3>
                        <span className="text-2xl font-bold text-primary">{data.freshnessScore}/100</span>
                    </div>
                    <Progress value={data.freshnessScore} className="h-3" indicatorClassName={getScoreColorClass(data.freshnessScore)} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                    <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-2 text-muted-foreground"><Package className="h-5 w-5 text-accent"/> Est. Shelf Life</h3>
                        <p className="text-2xl font-semibold">{data.estimatedShelfLife}</p>
                    </div>
                    <div className="space-y-2">
                         <h3 className="font-medium flex items-center gap-2 text-muted-foreground"><CalendarCheck className="h-5 w-5 text-accent"/> Optimal Consumption By</h3>
                        <p className="text-2xl font-semibold">{format(new Date(data.optimalConsumptionDate), "PPP")}</p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="font-medium flex items-center gap-2 mb-2"><Thermometer className="h-5 w-5 text-accent"/> Recommendations</h3>
                    <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">{data.recommendations}</p>
                </div>
            </CardContent>
        </Card>
    )
}
