import React from 'react';
import { Product } from '../types';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
}

export default function ProductCard({ product, isFavorite }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={() => addToCart(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-stone-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {product.category}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold">{product.rating}</span>
            <span className="text-[10px] text-stone-400 font-medium">/10</span>
          </div>
        </div>
        <h3 className="font-bold text-stone-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-stone-500 text-xs mb-4 line-clamp-2 h-8">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-stone-900">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-stone-900 text-white p-2 rounded-lg hover:bg-emerald-500 transition-colors active:scale-90"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
