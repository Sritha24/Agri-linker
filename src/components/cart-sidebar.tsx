"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { parsePrice } from "@/lib/utils";

export function CartSidebar({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-4">
          <SheetTitle>My Cart ({items.length})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
            <>
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4 p-4">
                {items.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-4">
                         <Image
                            src={`https://placehold.co/100x100.png`}
                            width={80}
                            height={80}
                            alt={item.product.name}
                            data-ai-hint="product image"
                            className="rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                Price: {item.product.price}
                            </p>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                    className="h-8 w-16"
                                />
                                <span className="text-sm text-muted-foreground">kg</span>
                            </div>
                        </div>
                         <div className="flex flex-col items-end gap-2">
                             <p className="font-semibold">
                                ₹{(parsePrice(item.product.price) * item.quantity).toFixed(2)}
                             </p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.product.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove item</span>
                            </Button>
                        </div>
                    </div>
                ))}
                </div>
            </ScrollArea>
            <SheetFooter className="mt-auto flex-col gap-4 border-t p-4">
                <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                 <SheetClose asChild>
                    <Button asChild className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                 </SheetClose>
            </SheetFooter>
            </>
        ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                 <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some fresh produce to get started!</p>
                <SheetClose asChild>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </SheetClose>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
