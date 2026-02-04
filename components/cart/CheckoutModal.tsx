"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatWhatsAppMessage, formatOrderJSON } from '@/lib/formatOrder';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const checkoutSchema = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    direccion: z.string().optional(),
    notas: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { items, getSubtotal, clearCart } = useCartStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const handleWhatsAppOrder = (data: CheckoutFormValues) => {
        const total = getSubtotal();
        const whatsappUrl = `https://wa.me/51922814060?text=${formatWhatsAppMessage(items, data, total)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyJSON = (data: CheckoutFormValues) => {
        const total = getSubtotal();
        const orderData = formatOrderJSON(items, data, total);
        navigator.clipboard.writeText(JSON.stringify(orderData, null, 2));
        toast.success('JSON copiado al portapapeles', {
            icon: '📝',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Form Side */}
                    <div className="p-8 md:p-10 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Casi listo...</h2>
                            <p className="text-foreground/60 text-sm">Completa tus datos para enviar el pedido.</p>
                        </div>

                        <form className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Nombre Completo</label>
                                <input
                                    {...register('nombre')}
                                    className={`w-full px-5 py-3.5 bg-secondary/20 border ${errors.nombre ? 'border-red-500' : 'border-transparent'} rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm`}
                                    placeholder="Juan Pérez"
                                />
                                {errors.nombre && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.nombre.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Dirección (Opcional)</label>
                                <input
                                    {...register('direccion')}
                                    className="w-full px-5 py-3.5 bg-secondary/20 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                                    placeholder="Calle Las Flores 123, Miraflores"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Notas del Pedido</label>
                                <textarea
                                    {...register('notas')}
                                    rows={2}
                                    className="w-full px-5 py-3.5 bg-secondary/20 border border-transparent rounded-[20px] outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm resize-none"
                                    placeholder="Ej: Empaque de regalo, horario de tarde..."
                                />
                            </div>
                        </form>
                    </div>

                    {/* Actions Side */}
                    <div className="bg-secondary/40 p-8 md:p-10 flex flex-col justify-between border-l border-border/50">
                        <div className="space-y-6">
                            <div className="p-6 bg-white rounded-3xl border border-border/50 shadow-sm space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40">Resumen</h4>
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground/60">{items.length} productos</p>
                                        <p className="text-3xl font-black text-primary leading-none">S/ {getSubtotal().toFixed(2)}</p>
                                    </div>
                                    <CheckCircle2 className="w-8 h-8 text-green-500/20" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleSubmit(handleWhatsAppOrder)}
                                    className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-xl shadow-green-500/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Enviar por WhatsApp
                                </button>

                                <button
                                    onClick={handleSubmit(handleCopyJSON)}
                                    className="w-full py-4 bg-foreground text-white font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    <Copy className="w-5 h-5" />
                                    Copiar JSON
                                </button>

                                <button
                                    onClick={() => {
                                        clearCart();
                                        toast('Carrito vaciado', { icon: '🗑️' });
                                        onClose();
                                    }}
                                    className="w-full py-3 text-red-500 text-xs font-bold hover:bg-red-50/50 rounded-xl transition-all"
                                >
                                    Vaciar carrito
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Cancelar y volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
