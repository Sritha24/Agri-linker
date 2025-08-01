
"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t, isHydrated } = useLanguage();

  useEffect(() => {
    // Clear sensitive farmer data on login page load
    localStorage.removeItem('fake_auth_token');
    localStorage.removeItem('farmer_location');
    localStorage.removeItem('farmer_products');
    sessionStorage.removeItem('editing_product');
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd validate credentials here.
    // For now, we'll just simulate a successful login.
    
    // Simulate setting a token
    localStorage.setItem("fake_auth_token", "some-jwt-token");

    toast({
      title: t('login_success_title'),
      description: t('login_success_desc'),
    });

    // Redirect to the farmer portal to check for location
    setTimeout(() => {
        router.push("/farmer-portal");
    }, 1000)
  };

  // Don't render content until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Loading...</CardTitle>
            <CardDescription>
              Please wait...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" disabled />
              </div>
              <Button type="submit" className="w-full" disabled>
                Loading...
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Leaf className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
          <CardDescription>
            {t('login_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('login_email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                required
                defaultValue="farmer@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('login_password_label')}</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  {t('login_forgot_password')}
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              {t('login_button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('login_no_account')}{" "}
            <Link href="/signup" className="underline">
              {t('login_signup_link')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
