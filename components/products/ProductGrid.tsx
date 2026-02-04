"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
    filters: {
        q: string;
        category: string;
        sort: string;
    };
    limit?: number;
}

export default function ProductGrid({ filters, limit }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: any = {
                    q: filters.q,
                    category: filters.category,
                    sort: filters.sort,
                };

                if (limit) {
                    params.limit = limit.toString();
                }

                const query = new URLSearchParams(params).toString();

                const res = await fetch(`/api/products?${query}`);
                const data = await res.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, limit]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-foreground/40 font-medium">Cargando productos...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
                <p className="text-lg font-bold text-foreground/60">No se encontraron productos</p>
                <p className="text-sm text-foreground/40">Intenta con otros filtros o términos de búsqueda</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}
