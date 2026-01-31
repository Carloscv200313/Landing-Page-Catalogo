"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const BLOG_POSTS = [
    {
        title: "5 pasos para una limpieza facial profunda",
        category: "Skincare",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
        excerpt: "Descubre la técnica de doble limpieza que transformará tu rutina nocturna y dejará tu piel radiante.",
        date: "5 min de lectura",
        author: "Dra. Sofía M."
    },
    {
        title: "Beneficios del Ácido Hialurónico en pieles maduras",
        category: "Anti-edad",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
        excerpt: "Hidratación y volumen: por qué este activo es el mejor aliado anti-edad. Desmentimos mitos.",
        date: "7 min de lectura",
        author: "Clara R."
    },
    {
        title: "La verdad sobre el SPF en invierno",
        category: "Protección Solar",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&q=80",
        excerpt: "¿Crees que no necesitas protector solar si está nublado? Te explicamos por qué los rayos UV siguen afectando.",
        date: "4 min de lectura",
        author: "Dra. Sofía M."
    }
];

export default function BlogPage() {
    return (
        <div className="pt-24 pb-20">
            {/* Featured Article Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-12 block">Artículo Destacado</span>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-video lg:aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000"
                                alt="Featured Blog Post"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-8">
                            <span className="inline-block px-4 py-1 bg-secondary text-accent text-[10px] font-black uppercase tracking-widest rounded-full">
                                Maquillaje
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                                Tendencias<br />
                                de maquillaje<br />
                                <span className="text-accent italic font-serif">2024</span>
                            </h1>
                            <p className="text-xl text-foreground/50 font-medium leading-relaxed max-w-md">
                                &ldquo;Descubre los estilos, colores y técnicas audaces que dominarán las pasarelas y el street style este año.&rdquo;
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                    <Image src="https://i.pravatar.cc/100?img=32" alt="Author" fill className="object-cover" />
                                </div>
                                <div className="text-xs">
                                    <p className="font-black text-foreground">Ana G.</p>
                                    <p className="text-foreground/40 font-bold">Editora Senior de Belleza</p>
                                </div>
                            </div>

                            <button className="px-10 py-5 bg-accent text-white font-black rounded-full shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center group">
                                Leer artículo completo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Blog Archive */}
            <section className="py-24 bg-[#FAFAFA]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight">Lo último en Lumina</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {['Todo', 'Cuidado de la Piel', 'Maquillaje', 'Bienestar', 'Anti-edad'].map((cat, i) => (
                                <button key={cat} className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-foreground text-white' : 'bg-white border border-border hover:border-primary'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {BLOG_POSTS.map((post, i) => (
                            <div key={i} className="group flex flex-col space-y-6">
                                <div className="relative aspect-4/5 rounded-[32px] overflow-hidden shadow-lg">
                                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full">{post.category}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-accent">
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-black leading-tight group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-foreground/50 text-sm leading-relaxed font-medium line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4 flex items-center justify-between border-t border-border/30">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                                <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Author" fill className="object-cover" />
                                            </div>
                                            <span className="text-[10px] font-black text-foreground/40">{post.author}</span>
                                        </div>
                                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">
                                            Leer más +
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link href="#" className="inline-flex items-center justify-center px-12 py-5 border border-border rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-foreground hover:text-white transition-all">
                            Ver todo el archivo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter - Pink Variation as per blog.png */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-secondary/40 rounded-[60px] p-12 md:p-24 text-center space-y-12">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <span className="text-2xl">💌</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                Únete al Club <span className="text-accent italic font-serif">Lumina</span>
                            </h2>
                            <p className="text-foreground/60 font-medium text-lg">
                                Recibe consejos exclusivos de nuestras cosmetólogas, acceso anticipado a ofertas y las últimas tendencias directamente en tu bandeja de entrada.
                            </p>
                        </div>

                        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="flex-1 px-8 py-5 bg-white border border-border rounded-full outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all font-bold"
                            />
                            <button className="px-10 py-5 bg-foreground text-white font-black rounded-full shadow-2xl hover:bg-accent transition-all">
                                Suscribirme
                            </button>
                        </form>
                        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Al suscribirte, aceptas nuestra Política de Privacidad.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
