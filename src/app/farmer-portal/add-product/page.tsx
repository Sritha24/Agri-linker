
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// In a real app, this would be a Zod schema or similar for validation
type ProductForm = {
    productName: string;
    quantity: number;
    price: number;
    description: string;
};

export default function AddProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, setValue } = useForm<ProductForm>();
    const [isEditing, setIsEditing] = useState(false);

    // Pre-fill form if editing
    useEffect(() => {
        const editingProduct = sessionStorage.getItem('editing_product');
        if (editingProduct) {
            setIsEditing(true);
            const product = JSON.parse(editingProduct);
            setValue('productName', product.name);
            setValue('quantity', parseInt(product.quantity));
            setValue('price', parseFloat(product.price));
            setValue('description', product.description || '');
        }
    }, [setValue]);


    const onSubmit = (data: ProductForm) => {
        const editingProduct = sessionStorage.getItem('editing_product');
        const location = localStorage.getItem('farmer_location');
        let products = JSON.parse(localStorage.getItem('farmer_products') || '[]');

        if (editingProduct) {
            // Update existing product
            const productToEdit = JSON.parse(editingProduct);
            const index = products.findIndex((p: any) => p.id === productToEdit.id);
            if (index !== -1) {
                products[index] = {
                    ...products[index],
                    name: data.productName,
                    quantity: `${data.quantity} kg`,
                    price: `₹${data.price}/kg`,
                    description: data.description,
                };
            }
            sessionStorage.removeItem('editing_product'); // Clean up
        } else {
             // Add new product
            const newProduct = {
                id: Date.now(),
                name: data.productName,
                quantity: `${data.quantity} kg`,
                price: `₹${data.price}/kg`,
                location: location || 'Unknown',
                description: data.description,
            };
            products.push(newProduct);
        }
        
        localStorage.setItem('farmer_products', JSON.stringify(products));

        toast({
            title: editingProduct ? "Product Updated!" : "Product Added!",
            description: `${data.productName} has been saved.`,
        });
        
        router.push('/farmer-portal');
    };

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
            <div className="mb-8">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/farmer-portal">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-muted-foreground">
                    {isEditing 
                        ? 'Update the details for your product.' 
                        : 'Fill out the form below to list a new item on the marketplace.'}
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Provide information about your produce.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input id="product-name" placeholder="e.g., Organic Tomatoes" {...register('productName', { required: true })} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Available Quantity (in kg)</Label>
                                <Input id="quantity" type="number" placeholder="e.g., 50" {...register('quantity', { required: true, valueAsNumber: true })}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price per kg (in ₹)</Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                                    <Input id="price" type="number" placeholder="e.g., 40" className="pl-8" {...register('price', { required: true, valueAsNumber: true })}/>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea id="description" placeholder="Describe your product, its quality, farming methods, etc." {...register('description')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-image">Product Image</Label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <Input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => router.push('/farmer-portal')}>Cancel</Button>
                            <Button type="submit">
                                {isEditing ? 'Update Product' : 'Add Product'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
