import React from 'react';
import { UserProfile, Activity as ActivityType } from '../types';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Settings, 
  ShoppingBag, 
  Heart, 
  Activity, 
  ChevronRight, 
  Calendar,
  Zap,
  Target,
  Award
} from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  onBack: () => void;
}

const MOCK_ACTIVITIES: ActivityType[] = [
  { id: '1', type: 'purchase', item: 'Pro Run 2000', timestamp: '2024-03-07T10:00:00Z', details: 'Order #SP-8821' },
  { id: '2', type: 'analysis', item: 'Running Performance', timestamp: '2024-03-06T15:30:00Z', details: 'Goal: Speed & Agility' },
  { id: '3', type: 'like', item: 'Elite Strike Ball', timestamp: '2024-03-05T09:15:00Z' },
  { id: '4', type: 'analysis', item: 'Gym Strength Scan', timestamp: '2024-03-04T18:45:00Z', details: 'Goal: Power & Strength' },
];

export default function ProfilePage({ profile, onBack }: ProfilePageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto py-12 px-4"
    >
      <button 
        onClick={onBack}
        className="mb-8 text-sm font-bold text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-500 p-1">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.uid}`} 
                  alt={profile.displayName}
                  className="w-full h-full rounded-full bg-stone-100"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-full border-4 border-white">
                <Trophy size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-stone-900 mb-1">{profile.displayName}</h2>
            <p className="text-sm text-stone-500 font-medium mb-6">{profile.email}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-100">
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Level</p>
                <p className="font-bold text-stone-900">Elite</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Joined</p>
                <p className="font-bold text-stone-900">Mar 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Zap size={120} />
            </div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="text-emerald-500" size={20} />
              Athlete Stats
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-sm">Scans Run</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-sm">Gear Owned</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-sm">Wishlist</span>
                <span className="font-bold">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">Activity Timeline</h3>
              <div className="bg-stone-100 p-2 rounded-xl text-stone-500">
                <Settings size={20} />
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-stone-100">
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} className="relative pl-16 group">
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
                    act.type === 'purchase' ? 'bg-emerald-100 text-emerald-600' :
                    act.type === 'analysis' ? 'bg-stone-900 text-white' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {act.type === 'purchase' && <ShoppingBag size={20} />}
                    {act.type === 'analysis' && <Activity size={20} />}
                    {act.type === 'like' && <Heart size={20} />}
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900">
                        {act.type === 'purchase' ? 'Equipment Purchased' :
                         act.type === 'analysis' ? 'Performance Analysis' :
                         'Added to Wishlist'}
                      </h4>
                      <p className="text-sm text-stone-600 font-medium">{act.item}</p>
                      {act.details && (
                        <p className="text-xs text-stone-400 mt-1">{act.details}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Calendar size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {new Date(act.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-4 rounded-2xl border border-stone-100 text-stone-500 font-bold text-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
              Load More Activities
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
              <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4">
                <Target size={20} />
              </div>
              <h4 className="font-bold text-emerald-900 mb-1">Current Goal</h4>
              <p className="text-sm text-emerald-700 font-medium">Speed & Agility Mastery</p>
            </div>
            <div className="bg-stone-100 p-6 rounded-[2rem] border border-stone-200">
              <div className="bg-stone-900 w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4">
                <Zap size={20} />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Next Milestone</h4>
              <p className="text-sm text-stone-600 font-medium">Complete 5 Pro Scans</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
