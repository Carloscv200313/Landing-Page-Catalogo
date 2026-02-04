"use client";

import { ArrowRight, Play, Star, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-white pt-24 pb-16">
            {/* Background elements if any, keeping it clean as per mockup */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    <div className="space-y-10 max-w-2xl">
                        <div className="inline-flex items-center px-4 py-1.5 bg-secondary/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse" />
                            Nueva Temporada 2024
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-foreground">
                            Belleza que <br />
                            <span className="text-primary italic font-serif">ilumina</span> tu camino
                        </h1>

                        <p className="text-xl text-foreground/50 leading-relaxed max-w-md font-medium">
                            Descubre cosmética de alta gama diseñada para realizar tu luz natural. Ingredientes puros, resultados visibles.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <Link
                                href="/tienda"
                                className="inline-flex items-center justify-center px-10 py-5 bg-foreground text-white font-black rounded-full shadow-2xl hover:bg-primary transition-all group scale-100 hover:scale-105 active:scale-95"
                            >
                                Explorar Tienda
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                className="inline-flex items-center justify-center px-10 py-5 bg-white text-foreground font-black rounded-full border border-border hover:bg-secondary transition-all group"
                            >
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                                Ver Video
                            </button>
                        </div>

                        {/* Customer social proof */}
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden relative">
                                        <Image
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-white bg-secondary flex items-center justify-center text-[10px] font-black">
                                    +12k
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Clientes Felices</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Main Image with very large rounded corners */}
                        <div className="relative aspect-[1/1.1] rounded-[60px] md:rounded-[100px] overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1674867688579-f46e18cd57f5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Lumina Skin Model"
                                fill
                                className="object-cover scale-105 hover:scale-110 transition-transform duration-1000"
                                priority
                            />
                        </div>

                        {/* Floating Product Card */}
                        <div className="absolute -bottom-8 -right-8 md:right-8 bg-white/95 backdrop-blur-xl p-5 rounded-[32px] shadow-2xl border border-white/20 flex items-center gap-5 w-full max-w-[280px] animate-in slide-in-from-bottom-10 duration-1000">
                            <div className="w-20 h-20 rounded-2xl bg-secondary/50 relative overflow-hidden shrink-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80"
                                    alt="Featured Product"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <h4 className="text-sm font-black text-foreground">Gold Edition Exit</h4>
                                <p className="text-[10px] font-bold text-foreground/40 uppercase">Edición Limitada</p>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-sm font-black text-primary">$120.00</span>
                                    <button className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center hover:bg-primary transition-colors pr-0.5">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
