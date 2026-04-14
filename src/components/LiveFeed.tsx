import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Users, ShoppingCart, Heart } from 'lucide-react';

const ACTIVITIES = [
  { user: "Alex M.", action: "purchased", item: "Pro Run 2000", time: "2m ago", icon: ShoppingCart },
  { user: "Sarah K.", action: "liked", item: "Cloud Walker", time: "5m ago", icon: Heart },
  { user: "James R.", action: "analyzed", item: "Cricket Gear", time: "8m ago", icon: Activity },
  { user: "Elena P.", action: "purchased", item: "Elite Strike Ball", time: "12m ago", icon: ShoppingCart },
  { user: "Mike T.", action: "joined", item: "Pro Athlete Club", time: "15m ago", icon: Users },
];

export default function LiveFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = ACTIVITIES[index];

  return (
    <div className="bg-stone-900 py-2 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-emerald-500">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Performance Feed</span>
        </div>
        
        <div className="h-4 w-px bg-white/10" />

        <div className="flex-1 relative h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute inset-0 flex items-center gap-2"
            >
              <current.icon size={12} className="text-stone-500" />
              <p className="text-[11px] text-stone-400 font-medium">
                <span className="text-white font-bold">{current.user}</span>
                {" "}{current.action}{" "}
                <span className="text-emerald-400 font-bold">{current.item}</span>
                <span className="ml-2 text-[9px] opacity-50">{current.time}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-stone-900 bg-stone-800 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/20/20`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-stone-500 font-bold">1,248 Athletes Online</span>
        </div>
      </div>
    </div>
  );
}
