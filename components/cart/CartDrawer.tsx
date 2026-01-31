"use client";

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useIsClient } from '@/hooks/use-is-client';


interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const isClient = useIsClient();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isClient) return null;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-70 shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            Tu Carrito
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="w-10 h-10 text-foreground/20" />
                                </div>
                                <p className="font-bold text-foreground/60 text-lg">Tu carrito está vacío</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                                >
                                    Ir a comprar
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item._id} className="flex gap-4 animate-in slide-in-from-right duration-300">
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-secondary/30 shrink-0 border border-border">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="p-1 text-foreground/20 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-primary font-bold text-sm">S/ {item.price.toFixed(2)}</p>

                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="p-1 px-2 hover:bg-secondary transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="p-1 px-2 hover:bg-secondary transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="text-xs font-bold text-foreground/60">
                                                S/ {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-border space-y-4 bg-secondary/10">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground/60">Subtotal</span>
                                    <span className="font-medium text-foreground">S/ {getSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground/60">Envío</span>
                                    <span className="font-medium text-green-600">Gratis</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-2">
                                    <span>Total</span>
                                    <span className="text-primary">S/ {getSubtotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="w-full py-4 bg-primary text-white font-black rounded-[24px] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                            >
                                Finalizar Pedido
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
