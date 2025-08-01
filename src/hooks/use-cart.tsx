"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './use-toast';
import { parsePrice } from '@/lib/utils';

export interface Product {
    id: number;
    name: string;
    quantity: string; // e.g. "50 kg"
    price: string; // e.g. "₹40/kg"
    location: string;
    description?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        // Load cart from local storage on initial render
        const savedCart = localStorage.getItem('buyer_cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to local storage whenever it changes
        localStorage.setItem('buyer_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                // If item exists, increase quantity by 1
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Otherwise, add new item with quantity 1
            return [...prevItems, { product, quantity: 1 }];
        });
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    const removeFromCart = (productId: number) => {
        setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
        toast({
            title: "Item Removed",
            description: `The item has been removed from your cart.`,
            variant: "destructive"
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };
    
    const subtotal = items.reduce((sum, item) => {
        const pricePerKg = parsePrice(item.product.price);
        return sum + pricePerKg * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};
