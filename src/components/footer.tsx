import Link from "next/link";
import { Leaf, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Leaf className="h-7 w-7" />
              <span className="font-headline">AgriLink</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting rural farmers with urban communities. Freshness delivered to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link></li>
                <li><Link href="/freshness-predictor" className="text-muted-foreground hover:text-foreground transition-colors">Freshness AI</Link></li>
                <li><Link href="/price-predictor" className="text-muted-foreground hover:text-foreground transition-colors">Price AI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sell on AgriLink</Link></li>
                <li><Link href="/farmer-faq" className="text-muted-foreground hover:text-foreground transition-colors">Farmer FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">Create an Account</Link></li>
                <li><Link href="/buyer-faq" className="text-muted-foreground hover:text-foreground transition-colors">Buyer FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgriLink. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
