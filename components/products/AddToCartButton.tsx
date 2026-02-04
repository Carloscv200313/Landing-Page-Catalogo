"use client";

import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product.name} añadido al carrito`, {
            icon: '✨',
            style: {
                borderRadius: '20px',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
            },
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full py-4 sm:py-5 bg-primary text-white font-black rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-base sm:text-lg"
        >
            <ShoppingBag className="w-5 h-5" />
            Añadir al Carrito
        </button>
    );
}
