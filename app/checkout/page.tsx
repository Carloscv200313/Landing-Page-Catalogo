"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, Minus, Plus, MessageCircle, Copy, ChevronLeft, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatWhatsAppMessage, formatOrderJSON } from '@/lib/formatOrder';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    telefono: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
    direccion: z.string().min(5, 'La dirección es obligatoria para el envío'),
    notas: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
    });

    const handleWhatsAppOrder = (data: CheckoutFormValues) => {
        const total = getSubtotal();
        const whatsappUrl = `https://wa.me/51922814060?text=${formatWhatsAppMessage(items, data, total)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyJSON = (data: CheckoutFormValues) => {
        const total = getSubtotal();
        const orderData = formatOrderJSON(items, data, total);
        navigator.clipboard.writeText(JSON.stringify(orderData, null, 2));
        toast.success('JSON copiado exitosamente');
    };

    if (items.length === 0) {
        return (
            <div className="pt-40 pb-20 container mx-auto px-4 text-center space-y-8">
                <h1 className="text-4xl font-black">Tu carrito está vacío</h1>
                <Link href="/tienda" className="inline-block px-10 py-5 bg-primary text-white font-black rounded-full shadow-lg">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/tienda" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-12 transition-colors group">
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Seguir comprando
                </Link>

                <h1 className="text-5xl font-black tracking-tight mb-4">Finalizar Pedido</h1>
                <p className="text-foreground/40 font-medium mb-12">Revisa tus productos y completa tus datos para generar tu orden por WhatsApp.</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Side: Items */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-border/50">
                            <h2 className="text-xl font-black mb-8">Tu Carrito ({items.length} artículos)</h2>

                            <div className="space-y-8">
                                {items.map((item) => (
                                    <div key={item._id} className="flex gap-6 items-center">
                                        <div className="relative w-24 h-24 rounded-[24px] overflow-hidden bg-secondary/30 border border-border/50 shrink-0">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between">
                                                <h3 className="font-black text-sm">{item.name}</h3>
                                                <button onClick={() => removeItem(item._id)} className="text-foreground/20 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{item.category.name}</p>
                                            <div className="flex justify-between items-center pt-2">
                                                <div className="flex items-center border border-border rounded-full px-2 py-1">
                                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 px-3 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                                                    <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 px-3 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                                                </div>
                                                <p className="font-black text-primary">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form & Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl border border-border/50 space-y-10">
                            <div className="space-y-6">
                                <h3 className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-accent">
                                    <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                                    Datos de Envío
                                </h3>

                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Nombre Completo</label>
                                        <input
                                            {...register('nombre')}
                                            placeholder="Ej. María Pérez"
                                            className={`w-full px-8 py-5 bg-[#F9F9F9] border ${errors.nombre ? 'border-red-500' : 'border-transparent'} rounded-[24px] outline-none focus:bg-white focus:border-primary transition-all font-bold`}
                                        />
                                        {errors.nombre && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.nombre.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Teléfono / WhatsApp</label>
                                        <input
                                            {...register('telefono')}
                                            placeholder="Ej. 999 888 777"
                                            className={`w-full px-8 py-5 bg-[#F9F9F9] border ${errors.telefono ? 'border-red-500' : 'border-transparent'} rounded-[24px] outline-none focus:bg-white focus:border-primary transition-all font-bold`}
                                        />
                                        {errors.telefono && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.telefono.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Dirección de Entrega</label>
                                        <input
                                            {...register('direccion')}
                                            placeholder="Ej. Av. Larco 123, Miraflores, Lima"
                                            className={`w-full px-8 py-5 bg-[#F9F9F9] border ${errors.direccion ? 'border-red-500' : 'border-transparent'} rounded-[24px] outline-none focus:bg-white focus:border-primary transition-all font-bold`}
                                        />
                                        {errors.direccion && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.direccion.message}</p>}
                                    </div>
                                </form>
                            </div>

                            <div className="pt-10 border-t border-border/50 space-y-4">
                                <div className="flex justify-between text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>S/ {getSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                    <span>Envío</span>
                                    <span className="text-green-500">Por coordinar</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="text-2xl font-black">Total</span>
                                    <span className="text-3xl font-black text-accent leading-none">S/ {getSubtotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={handleSubmit(handleWhatsAppOrder)}
                                    className="w-full py-6 bg-accent text-white font-black rounded-full shadow-2xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Enviar pedido por WhatsApp
                                </button>

                                <button
                                    onClick={handleSubmit(handleCopyJSON)}
                                    className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copiar detalles (JSON)
                                </button>
                            </div>

                            <div className="flex items-center justify-center space-x-2 opacity-30 grayscale">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Checkout seguro y encriptado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
