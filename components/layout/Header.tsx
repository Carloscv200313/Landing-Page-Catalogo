"use client";

import { ShoppingBag, Menu, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useSyncExternalStore } from 'react';
import { useCartStore } from '@/store/useCartStore';
import CartDrawer from '../cart/CartDrawer';

const emptySubscribe = () => () => { };

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());

    // To avoid hydration issues with localStorage
    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg rotate-45 flex items-center justify-center transition-transform group-hover:rotate-225 duration-700">
                            <Sparkles className="w-4 h-4 text-white -rotate-45" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-foreground">
                            Lumina
                        </span>
                    </Link>

                    {/* Navigation - Centered and All Caps as per Mockup */}
                    <nav className="hidden md:flex items-center space-x-12 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/50">
                        <Link href="/" className="hover:text-primary transition-colors hover:scale-105">Inicio</Link>
                        <Link href="/tienda" className="hover:text-primary transition-colors hover:scale-105">Tienda</Link>

                        <Link href="/blog" className="hover:text-primary transition-colors hover:scale-105">Blog</Link>
                    </nav>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-4">


                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-foreground/60 hover:text-primary transition-colors relative"
                        >
                            <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
                            {mounted && totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-accent text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in duration-300">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <button className="md:hidden p-2 text-foreground/60 hover:text-primary transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
