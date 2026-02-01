"use client";

import Image from 'next/image';
import { Check, Star, Truck, ShieldCheck, X } from 'lucide-react';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';
import { useEffect } from 'react';

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 100 }}>
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 scrollbar-hide">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-foreground hover:text-white transition-all shadow-lg"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left Side: Image */}
                    <div className="relative bg-[#F9F9F9] lg:h-full min-h-[400px] aspect-square lg:aspect-auto">
                        <Image
                            src={product.images[0] || 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=500&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-6 left-6">
                            {product.tags.includes('best seller') && (
                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full text-primary shadow-lg">
                                    Más Vendido
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Info */}
                    <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-accent text-sm">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="font-bold text-foreground/40">(120 reseñas)</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                                {product.name}
                            </h2>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-black text-primary">S/ {product.price.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="prose prose-sm text-foreground/60 font-medium leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-border">
                            <div className="flex items-center gap-4 text-xs font-bold text-foreground/60">
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <span>Envío Gratis S/ 200</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    <span>Garantía de Calidad</span>
                                </div>
                            </div>

                            <AddToCartButton product={product} />
                        </div>

                        <div className="p-4 bg-secondary/20 rounded-2xl border border-secondary/50">
                            <h3 className="font-black text-xs uppercase tracking-widest mb-1 flex items-center text-foreground">
                                <Check className="w-3 h-3 mr-1 text-green-500" />
                                Ingredientes Activos
                            </h3>
                            <p className="text-[10px] text-foreground/50 font-medium">
                                Libre de parabenos y crueldad animal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
