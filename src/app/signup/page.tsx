
"use client";

import Link from "next/link"
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
import { useLanguage } from "@/hooks/use-language";

export default function SignupPage() {
    const { t, isHydrated } = useLanguage();

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
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="John Doe" disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
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
            <CardTitle className="text-2xl">{t('signup_title')}</CardTitle>
            <CardDescription>
            {t('signup_subtitle')}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name">{t('signup_name_label')}</Label>
                <Input id="full-name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">{t('signup_email_label')}</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">{t('signup_password_label')}</Label>
                <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
                {t('signup_button')}
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            {t('signup_have_account')}{" "}
            <Link href="/login" className="underline">
                {t('signup_login_link')}
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
