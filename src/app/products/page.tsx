"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart, type Product } from "@/hooks/use-cart";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        // Simulate fetching products
        setTimeout(() => {
            const storedProducts = JSON.parse(localStorage.getItem('farmer_products') || '[]');
            setProducts(storedProducts);
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                    Fresh from the Farm
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-2xl">
                    Browse a wide selection of produce directly from local farmers. Quality and freshness, guaranteed.
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <Card key={product.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                            <CardHeader>
                                <Image
                                    src={`https://placehold.co/400x300.png`}
                                    width={400}
                                    height={300}
                                    alt={product.name}
                                    data-ai-hint="produce image"
                                    className="rounded-t-lg object-cover w-full aspect-[4/3]"
                                />
                            </CardHeader>
                             <CardContent className="flex-grow p-4">
                                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <MapPin className="h-4 w-4 text-accent" />
                                    <span>{product.location}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <Badge variant="secondary">Available: {product.quantity}</Badge>
                                  <p className="text-lg font-bold text-primary">{product.price}</p>
                                </div>
                                {product.description && <CardDescription className="mt-2 text-sm">{product.description}</CardDescription>}
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full" onClick={() => addToCart(product)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h3 className="text-2xl font-semibold">No Products Available</h3>
                    <p className="text-muted-foreground mt-2">
                        It looks like there are no products listed at the moment. Please check back later!
                    </p>
                </div>
            )}
        </div>
    )
}
