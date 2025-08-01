
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreVertical, Pencil, Trash2, Loader2, MapPin } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Product {
    id: number;
    name: string;
    quantity: string;
    price: string;
    location: string;
    description?: string;
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const token = typeof window !== 'undefined' ? localStorage.getItem("fake_auth_token") : null;
            setIsAuthenticated(!!token); 
            setIsLoading(false);
        }, 500);
    }, []);

    return { isAuthenticated, isLoading };
};

export default function FarmerPortalPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [location, setLocation] = useState('');
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const router = useRouter();
    const { isAuthenticated, isLoading: isLoadingAuth } = useAuth();
    
    useEffect(() => {
        if (!isLoadingAuth && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoadingAuth, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            const farmerLocation = localStorage.getItem('farmer_location');
            if (!farmerLocation) {
                router.push('/farmer-portal/set-location');
            } else {
                setLocation(farmerLocation);
                const storedProducts = JSON.parse(localStorage.getItem('farmer_products') || '[]');
                setProducts(storedProducts);
                setIsLoadingProducts(false);
            }
        }
    }, [isAuthenticated, router]);
    
    // Clear editing state when entering the page
    useEffect(() => {
        sessionStorage.removeItem('editing_product');
    }, []);

    const handleEdit = (product: Product) => {
        sessionStorage.setItem('editing_product', JSON.stringify(product));
        router.push('/farmer-portal/add-product');
    };

    const handleDelete = (productId: number) => {
        const updatedProducts = products.filter(p => p.id !== productId);
        setProducts(updatedProducts);
        localStorage.setItem('farmer_products', JSON.stringify(updatedProducts));
    };

    if (isLoadingAuth || !isAuthenticated || !location) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                        Farmer Dashboard
                    </h1>
                    <p className="text-muted-foreground md:text-xl flex items-center gap-2 mt-2">
                        <MapPin className="h-5 w-5 text-accent" />
                        Selling from: <span className="font-semibold text-foreground">{location}</span>
                    </p>
                </div>
                <Button asChild>
                    <Link href="/farmer-portal/add-product">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Listings</CardTitle>
                    <CardDescription>Here are the products you are currently selling on AgriLink.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingProducts ? (
                         <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <Card key={product.id} className="flex flex-col">
                                    <CardHeader className="flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle>{product.name}</CardTitle>
                                            <CardDescription>{product.location}</CardDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <AlertDialog>
                                                  <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                      <Trash2 className="mr-2 h-4 w-4" />
                                                      Delete
                                                    </DropdownMenuItem>
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                      <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        product listing for &quot;{product.name}&quot;.
                                                      </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                      <AlertDialogAction onClick={() => handleDelete(product.id)} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                  </AlertDialogContent>
                                                </AlertDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardHeader>
                                    <CardContent className="space-y-2 flex-grow">
                                        <p className="text-muted-foreground">Available: <span className="font-semibold text-foreground">{product.quantity}</span></p>
                                        <p className="text-muted-foreground">Price: <span className="font-semibold text-foreground">{product.price}</span></p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">View Details</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-medium">No products listed yet.</h3>
                            <p className="text-muted-foreground mt-2">Click &quot;Add New Product&quot; to get started.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
