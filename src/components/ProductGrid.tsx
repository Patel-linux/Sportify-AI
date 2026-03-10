import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { UserProfile, Product, CATEGORIES } from '../types';
import { getProducts } from '../services/productService';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ProductGridProps {
  user: User | null;
  profile: UserProfile | null;
}

export default function ProductGrid({ user, profile }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(selectedCategory || undefined);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            !selectedCategory 
              ? 'bg-emerald-500 text-stone-900 shadow-lg shadow-emerald-500/20' 
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All Gear
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-stone-900 shadow-lg shadow-emerald-500/20' 
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-stone-200 animate-pulse rounded-2xl aspect-[3/4]" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isFavorite={profile?.favorites.includes(product.id) || false}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
          <p className="text-stone-500 font-medium">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
