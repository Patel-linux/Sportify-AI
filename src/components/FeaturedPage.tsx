import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Zap, Filter } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { User } from 'firebase/auth';
import { UserProfile } from '../types';

interface FeaturedPageProps {
  user: User | null;
  profile: UserProfile | null;
  onBack: () => void;
}

export default function FeaturedPage({ user, profile, onBack }: FeaturedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto py-12 px-4"
    >
      <button 
        onClick={onBack}
        className="mb-8 text-sm font-bold text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="relative mb-16 rounded-[3rem] bg-stone-900 p-12 overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Trophy size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/30">
            <Sparkles size={14} />
            Exclusive Athlete Selection
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Pro Gear <span className="text-emerald-500">Showcase</span>
          </h2>
          <p className="text-stone-400 text-lg font-medium leading-relaxed">
            Explore the elite selection of equipment used by professionals. Each item is verified for technical excellence and performance durability.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Featured Collection</h3>
          <p className="text-stone-500 font-medium">Curated by AI Performance Metrics</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-2xl font-bold text-sm hover:bg-stone-50 transition-all">
            <Filter size={18} />
            Filter
          </button>
          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-stone-900 rounded-2xl font-bold text-sm">
            <Zap size={18} />
            Top Rated
          </div>
        </div>
      </div>

      <ProductGrid user={user} profile={profile} />
    </motion.div>
  );
}
