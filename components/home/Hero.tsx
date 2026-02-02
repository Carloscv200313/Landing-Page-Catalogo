"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center text-primary/20 font-black animate-pulse">Cargando 3D...</div>
});

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-[#f5f5f5] overflow-hidden flex flex-col">
            
            {/* CAPA 3D: Siempre centrada respecto al viewport */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Scene />
            </div>

            {/* CONTENIDO: Usamos flex-col y justify-between para que se adapte solo */}
            <div className="relative h-full w-full z-30 flex flex-col items-center justify-between py-12 md:py-20 px-6">
                
                {/* PARTE SUPERIOR (Título) */}
                <div className="flex flex-col items-center text-center mt-8 md:mt-12">
                    <div className="inline-flex items-center px-4 py-1.5 bg-white/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 border border-primary/10">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse" />
                        Nueva Temporada 2024
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-[120px] lg:text-[150px] font-black tracking-tighter leading-[0.8] text-[#1a1a1a] uppercase select-none">
                        Gla <span className="text-primary italic font-serif lowercase md:opacity-0">mour</span> Skin
                    </h1>
                </div>

                {/* PARTE INFERIOR (Párrafo y Botón) */}
                <div className="flex flex-col md:mt-40 items-center text-center max-w-lg mb-4">
                    <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-medium mb-8">
                        Descubre cosmética de alta gama diseñada para realzar tu luz natural.
                    </p>

                    <div className="flex flex-wrap justify-center">
                        <Link href="/tienda" className="pointer-events-auto inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-foreground text-white font-black rounded-full shadow-2xl hover:bg-primary transition-all group active:scale-95">
                            Explorar Tienda
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 blur-[120px] rounded-full z-0" />
        </section>
    );
}