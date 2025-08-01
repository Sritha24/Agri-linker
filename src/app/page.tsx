
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Feather, ShoppingCart, Tractor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t, isHydrated } = useLanguage();

  // Don't render content until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex flex-col min-h-dvh">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                      Loading...
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const howItWorksSteps = [
    {
      title: t('home_how_it_works_step1_title'),
      description: t('home_how_it_works_step1_desc'),
      icon: Feather,
    },
    {
      title: t('home_how_it_works_step2_title'),
      description: t('home_how_it_works_step2_desc'),
      icon: ShoppingCart,
    },
    {
      title: t('home_how_it_works_step3_title'),
      description: t('home_how_it_works_step3_desc'),
      icon: Bot,
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    {t('home_hero_title_1')}
                    <br />
                    <span className="text-primary">{t('home_hero_title_2')}</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('home_hero_subtitle')}
                  </p>
                </div>
              </div>
              <Image
                src="https://img.freepik.com/premium-photo/woman-hijab-shops-produce-bustling-market_14117-703736.jpg"
                width="600"
                height="600"
                alt="Farmer"
                data-ai-hint="farmer field"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge>{t('home_how_it_works_badge')}</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('home_how_it_works_title')}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('home_how_it_works_subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="grid gap-2 text-center">
                  <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary/20 text-primary p-4 rounded-full">
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="join-us" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge>{t('home_join_us_badge')}</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('home_join_us_title')}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('home_join_us_subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2">
              <Card className="flex flex-col text-center items-center p-8 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                <div className="bg-primary/20 text-primary p-4 rounded-full mb-6">
                    <Tractor className="w-10 h-10" />
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">{t('home_join_us_farmer_title')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <p className="text-muted-foreground">{t('home_join_us_farmer_desc')}</p>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild size="lg" className="w-full"><Link href="/login">{t('get_started')}</Link></Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col text-center items-center p-8 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                <div className="bg-primary/20 text-primary p-4 rounded-full mb-6">
                    <ShoppingCart className="w-10 h-10" />
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">{t('home_join_us_buyer_title')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <p className="text-muted-foreground">{t('home_join_us_buyer_desc')}</p>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild size="lg" className="w-full"><Link href="/products">{t('get_started')}</Link></Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
