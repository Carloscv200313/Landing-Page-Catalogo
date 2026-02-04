"use client";

import { useState } from 'react';
import Filters from '@/components/products/Filters';
import ProductGrid from '@/components/products/ProductGrid';
import Image from 'next/image';

export default function TiendaPage() {
    const [filters, setFilters] = useState({
        q: '',
        category: '',
        sort: 'newest',
    });

    return (
        <div className="pt-24 pb-20">
            {/* Tienda Hero */}
            <section className="py-20 bg-[#F9F9F9]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h1 className="text-6xl font-black tracking-tight leading-tight">
                                Belleza Auténtica,<br />
                                <span className="text-primary italic font-serif">Resalta</span> con Lumina
                            </h1>
                            <p className="text-foreground/50 text-lg font-medium max-w-md">
                                Descubre nuestra colección exclusiva de cosmetología profesional, formulada para realizar tu brillo natural y cuidar tu piel.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-10 py-5 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/20">
                                    Ver Productos
                                </button>
                                <button className="px-10 py-5 bg-white border border-border text-foreground font-black rounded-full">
                                    Conocer Más
                                </button>
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl scale-105">
                            <Image
                                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000"
                                alt="Tienda Banner"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="flex flex-col space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-12">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tight">Catálogo de Cosmetología</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Mostrando 12 productos</p>
                        </div>
                    </div>

                    <Filters
                        currentFilters={filters}
                        onFilterChange={setFilters}
                    />

                    <ProductGrid filters={filters} />

                    <div className="flex justify-center pt-12">
                        <button className="px-12 py-5 border border-border rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-foreground hover:text-white transition-all">
                            Cargar Más Productos
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
