import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Youtube, Check } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg rotate-45 flex items-center justify-center">
                                <span className="text-white font-bold -rotate-45">L</span>
                            </div>
                            <span className="text-2xl font-black tracking-tight text-foreground">
                                Lumina
                            </span>
                        </Link>
                        <p className="text-sm font-medium text-foreground/40 leading-relaxed max-w-xs">
                            Redefiniendo el estándar de belleza con productos que celebran tu autenticidad. Cosmética ética y efectiva.
                        </p>
                        <div className="flex space-x-3">
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-foreground hover:text-white transition-all text-foreground/40">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Explorar</h4>
                        <ul className="space-y-4 text-[13px] font-bold text-foreground/40">
                            <li><Link href="/" className="hover:text-primary transition-colors">Novedades</Link></li>
                            <li><Link href="/tienda" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                            <li><Link href="/tienda" className="hover:text-primary transition-colors">Skin Care</Link></li>
                            <li><Link href="/tienda" className="hover:text-primary transition-colors">Maquillaje</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Soporte</h4>
                        <ul className="space-y-4 text-[13px] font-bold text-foreground/40">
                            <li><Link href="#" className="hover:text-primary transition-colors">Ayuda y FAQs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Envíos</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Devoluciones</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Rastreo de Orden</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Legal</h4>
                        <ul className="space-y-4 text-[13px] font-bold text-foreground/40">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Términos</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/20">© 2024 Lumina. Todos los derechos reservados.</p>

                    {/* Payment methods placeholders as seen in mockup */}
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-6 bg-[#F5F5F5] rounded-md border border-border" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
