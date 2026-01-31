"use client";

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation to prevent opening modal
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
        <>
            <div
                className="group bg-white rounded-[32px] overflow-hidden border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="relative aspect-4/5 overflow-hidden bg-[#F9F9F9]">
                    <Image
                        src={product.images[0] || 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=500&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    <div className="absolute top-4 left-4">
                        {product.tags.includes('best seller') && (
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full text-primary shadow-sm border border-primary/10">
                                Más Vendido
                            </span>
                        )}
                        {!product.tags.includes('best seller') && product.isActive && (
                            <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                Nuevo
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-6 py-3 bg-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-foreground hover:text-white">
                            Ver detalles
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <h3 className="font-black text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-[11px] font-bold text-foreground/30 line-clamp-1 uppercase tracking-wider">
                            {product.description}
                        </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-border/30">
                        <span className="text-lg font-black text-foreground">
                            S/ {product.price.toFixed(2)}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-white transition-all transform hover:scale-110 active:scale-90"
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <ProductDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </>
    );
}
