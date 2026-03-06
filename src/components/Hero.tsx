import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onShopNow?: () => void;
  onViewCategories?: () => void;
}

export default function Hero({ onShopNow, onViewCategories }: HeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white min-h-[500px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]" />
      </div>

      <div className="relative z-10 px-8 md:px-16 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            AI-Powered Gear Selection
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tighter">
            ELEVATE YOUR <span className="text-emerald-500 italic">PERFORMANCE.</span>
          </h1>
          <p className="text-stone-400 text-lg mb-8 max-w-md">
            Discover elite sports equipment curated by AI. High-rated, athlete-tested, and performance-driven.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShopNow}
              className="bg-emerald-500 hover:bg-emerald-400 text-stone-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              Shop Now <ArrowRight size={20} />
            </button>
            <button 
              onClick={onViewCategories}
              className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-4 rounded-xl font-bold transition-all border border-stone-700 active:scale-95"
            >
              View Categories
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/athlete/800/600" 
              alt="Athlete" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white text-stone-900 p-4 rounded-2xl shadow-xl z-20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
              <span className="font-bold">4.9/5</span>
            </div>
            <div className="text-xs text-stone-500 font-medium">Expert Rated Gear</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-emerald-500 text-stone-900 p-4 rounded-2xl shadow-xl z-20"
          >
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={16} />
              <span className="font-bold">Pro Verified</span>
            </div>
            <div className="text-xs text-stone-900/70 font-medium">Authenticity Guaranteed</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
