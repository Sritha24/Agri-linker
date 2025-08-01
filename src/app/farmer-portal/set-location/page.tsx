
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function SetLocationPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('fake_auth_token');
    if (!token) {
        router.push('/login');
    }
  }, [router]);

  const handleSetLocation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const location = formData.get("location") as string;
    
    if (location && location.trim().length > 2) {
      localStorage.setItem("farmer_location", location.trim());
      toast({
        title: "Location Saved!",
        description: `Your dashboard is now set to ${location.trim()}.`,
      });
      router.push("/farmer-portal/add-product");
    } else {
        toast({
            title: "Invalid Location",
            description: "Please enter a valid city or region.",
            variant: "destructive"
        })
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome, Farmer!</CardTitle>
          <CardDescription>
            Before you continue, where will you be selling your produce from?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetLocation} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Your Location (City, State)</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Nashik, Maharashtra"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add a Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
