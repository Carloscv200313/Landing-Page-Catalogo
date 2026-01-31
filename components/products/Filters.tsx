"use client";

import { Search, SlidersHorizontal } from 'lucide-react';

interface FiltersProps {
    onFilterChange: (filters: { q: string; category: string; sort: string }) => void;
    currentFilters: { q: string; category: string; sort: string };
}

const CATEGORIES = [
    { name: 'Todos', slug: '' },
    { name: 'Labiales', slug: 'labiales' },
    { name: 'Rostro', slug: 'rostro' },
    { name: 'Ojos', slug: 'ojos' },
    { name: 'Cuidado Piel', slug: 'skin-care' },
];

const SORT_OPTIONS = [
    { name: 'Novedades', value: 'newest' },
    { name: 'Precio: Menor a Mayor', value: 'price_asc' },
    { name: 'Precio: Mayor a Menor', value: 'price_desc' },
];

export default function Filters({ onFilterChange, currentFilters }: FiltersProps) {
    const handleChange = (key: string, value: string) => {
        onFilterChange({ ...currentFilters, [key]: value });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                {/* Search */}
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                        value={currentFilters.q}
                        onChange={(e) => handleChange('q', e.target.value)}
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-3 w-full lg:w-auto">
                    <SlidersHorizontal className="w-4 h-4 text-foreground/40" />
                    <select
                        className="flex-1 lg:flex-none bg-white border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm font-medium"
                        value={currentFilters.sort}
                        onChange={(e) => handleChange('sort', e.target.value)}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => handleChange('category', cat.slug)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${currentFilters.category === cat.slug
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                : 'bg-white text-foreground/60 border border-border hover:border-primary hover:text-primary'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
