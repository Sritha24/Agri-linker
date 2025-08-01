"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parsePrice } from "@/lib/utils";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    if (items.length === 0) {
         router.replace("/products");
         return null;
    }
    
    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would integrate with a payment gateway.
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your order is on its way!",
        });
        clearCart();
        router.push("/");
    }

    const shipping = 50.00; // Flat rate shipping
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
            <div className="mb-8">
                 <Button asChild variant="ghost" className="mb-4">
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Checkout
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Order Summary */}
                <div className="lg:col-span-1 order-last lg:order-first">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map(item => (
                                <div key={item.product.id} className="flex items-center justify-between gap-4">
                                     <Image
                                        src={`https://placehold.co/100x100.png`}
                                        width={50}
                                        height={50}
                                        alt={item.product.name}
                                        data-ai-hint="product image"
                                        className="rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">₹{(parsePrice(item.product.price) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-muted-foreground">Subtotal</p>
                                    <p>₹{subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-muted-foreground">Shipping</p>
                                    <p>₹{shipping.toFixed(2)}</p>
                                </div>
                                <Separator />
                                 <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>₹{total.toFixed(2)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Payment & Shipping */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleCheckout}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping & Payment</CardTitle>
                                <CardDescription>Enter your details to complete the purchase.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Shipping Address</Label>
                                    <Input id="address" placeholder="123 Fresh Lane, Farmville" required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="Mumbai" required />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" placeholder="Maharashtra" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" placeholder="400001" required />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Payment Details</Label>
                                    <div className="flex items-center gap-2 border rounded-md p-3 bg-secondary/50">
                                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                                        <Input placeholder="Card Number" className="border-0 bg-transparent shadow-none focus-visible:ring-0" required/>
                                        <Input placeholder="MM/YY" className="border-0 bg-transparent shadow-none focus-visible:ring-0 w-24" required/>
                                        <Input placeholder="CVC" className="border-0 bg-transparent shadow-none focus-visible:ring-0 w-16" required/>
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button type="submit" size="lg" className="w-full">
                                    Place Order (₹{total.toFixed(2)})
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )
}
