"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, Languages, Receipt, ShoppingCart, BookUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot } from "lucide-react";
import { CartSidebar } from "./cart-sidebar";
import { useCart } from "@/hooks/use-cart";
import { useLanguage } from "@/hooks/use-language";

export function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { language, setLanguage, t, isHydrated } = useLanguage();

  // Don't render navigation content until hydration is complete
  if (!isHydrated) {
    return (
      <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Leaf className="h-7 w-7" />
            <span className="font-headline">AgriLink</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  const navLinks = [
    { href: "/", label: t('nav_home') },
    { href: "/products", label: t('nav_products') },
    { href: "/freshness-predictor", label: t('nav_freshness_ai'), icon: Bot },
    { href: "/price-predictor", label: t('nav_price_ai'), icon: Receipt },
    { href: "/farmer-awareness", label: t('nav_farmer_awareness'), icon: BookUser },
  ];

  return (
    <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Leaf className="h-7 w-7" />
          <span className="font-headline">AgriLink</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
           <CartSidebar>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Button>
          </CartSidebar>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setLanguage('en')} disabled={language === 'en'}>English</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLanguage('te')} disabled={language === 'te'}>తెలుగు (Telugu)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6 h-full">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
                  <Leaf className="h-7 w-7" />
                  <span className="font-headline">AgriLink</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-muted-foreground hover:text-foreground flex items-center gap-2">
                       {link.icon && <link.icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
