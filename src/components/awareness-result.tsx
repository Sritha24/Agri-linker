import type { GenerateFarmerAwarenessReportOutput } from "@/ai/flows/generate-farmer-awareness-report";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Cloud, ExternalLink, HandCoins, Sprout } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface AwarenessResultProps {
    data: GenerateFarmerAwarenessReportOutput;
}

export function AwarenessResult({ data }: AwarenessResultProps) {
    return (
        <Card className="animate-in fade-in-50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">AI Farmer Awareness Report</CardTitle>
                <CardDescription>This is an AI-generated report based on your selected district.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                
                <div className="space-y-4 border-b pb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><HandCoins className="h-6 w-6 text-primary"/> Market Talk</h3>
                    <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">{data.marketTalk}</p>
                </div>
                
                <div className="space-y-4 border-b pb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><Cloud className="h-6 w-6 text-primary"/> Weather Report</h3>
                    <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">{data.weather}</p>
                </div>
                
                <div className="space-y-4 border-b pb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><Sprout className="h-6 w-6 text-primary"/> Crop Recommendations</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.cropRecommendations.map(crop => (
                            <Badge key={crop} variant="secondary" className="text-lg py-1 px-3">{crop}</Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary"/> Government Policies & Links</h3>
                    <div className="space-y-4">
                        {data.governmentPolicies.map((policy, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-secondary/30">
                                <h4 className="font-semibold">{policy.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1 mb-2">{policy.description}</p>
                                <Link href={policy.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                                    Official Link <ExternalLink className="h-3 w-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
