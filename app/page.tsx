"use client";

import Hero from '@/components/home/Hero';
import ProductGrid from '@/components/products/ProductGrid';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const filters = {
    q: '',
    category: '',
    sort: 'newest',
  };

  const logos = ["VOGUE", "ELLE", "BAZAAR", "GLAMOUR", "VANITY FAIR"];

  const collections = [
    { title: "Luxury Skincare", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800" },
    { title: "Gold Edition", img: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=800" },
    { title: "Botanical Pure", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800" }
  ];

  return (
    <>
      <Hero />

      {/* Logos Section */}
      <section className="py-20 border-y border-border overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {logos.map(logo => (
              <span key={logo} className="text-2xl md:text-3xl font-black tracking-[0.2em]">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tendencias Section */}
      <section id="tienda" className="py-32 container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nuestra Selección</span>
            <h2 className="text-5xl font-black tracking-tight text-foreground">
              Tendencias
            </h2>
          </div>
          <Link href="/tienda" className="text-xs font-black uppercase tracking-widest flex items-center group text-foreground/40 hover:text-primary transition-colors">
            Ver todo el catálogo
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-16">
          <ProductGrid filters={filters} limit={4} />
        </div>
      </section>

      {/* Colecciones Exclusivas */}
      <section id="colecciones" className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black tracking-tight">Colecciones Exclusivas</h2>
          <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Líneas diseñadas para cada momento de tu ritual de belleza</p>
        </div>

        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col, i) => (
            <Link href={`/tienda?category=${col.title.toLowerCase().replace(' ', '-')}`} key={i} className="group relative aspect-3/4 rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src={col.img}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="text-2xl font-black text-white">{col.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section - Matches bottom of inicio.png */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#121212] rounded-[60px] p-12 md:p-24 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Club Lumina</div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                  Únete y recibe <span className="text-primary italic font-serif">15% OFF</span>
                </h2>
                <p className="text-white/40 font-medium text-lg leading-relaxed">
                  Sé la primera en conocer nuestros lanzamientos exclusivos y consejos de belleza.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-10 py-6 bg-white/5 border border-white/10 rounded-full text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-lg font-bold"
                />
                <button className="px-10 py-6 bg-primary text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
