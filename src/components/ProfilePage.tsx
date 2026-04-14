import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Award,
  MessageSquare,
  History,
  ExternalLink
} from 'lucide-react';
import { UserProfile, Activity as ActivityType, ChatSession, Order } from '../types';

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

const MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    title: 'Running Gear Advice',
    lastMessage: 'The Pro Run 2000 is excellent for marathon training...',
    timestamp: '2024-03-07T11:00:00Z',
    messages: []
  },
  {
    id: 'c2',
    title: 'Cricket Bat Comparison',
    lastMessage: 'The Elite Strike offers more power for aggressive hitters.',
    timestamp: '2024-03-06T14:20:00Z',
    messages: []
  }
];

const MOCK_PURCHASES: Order[] = [
  { id: 'o1', userId: 'u1', productId: 'p1', productName: 'Pro Run 2000', price: 189.99, timestamp: '2024-03-07T10:00:00Z' },
  { id: 'o2', userId: 'u1', productId: 'p2', productName: 'Compression Sleeves', price: 34.50, timestamp: '2024-02-15T12:00:00Z' }
];

export default function ProfilePage({ profile, onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = React.useState<'timeline' | 'history'>('timeline');
  const [historySubTab, setHistorySubTab] = React.useState<'purchases' | 'chats'>('purchases');

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

        {/* Right Column: Activity Feed & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex gap-4 p-1 bg-stone-100 rounded-2xl w-fit">
                <button 
                  onClick={() => setActiveTab('timeline')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  Timeline
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  History
                </button>
              </div>
              <div className="bg-stone-100 p-2 rounded-xl text-stone-500 self-end sm:self-auto">
                <Settings size={20} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'timeline' ? (
                <motion.div 
                  key="timeline"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-stone-100"
                >
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
                </motion.div>
              ) : (
                <motion.div 
                  key="history"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex gap-4 mb-6 border-b border-stone-100 pb-4">
                    <button 
                      onClick={() => setHistorySubTab('purchases')}
                      className={`flex items-center gap-2 text-sm font-bold transition-colors ${historySubTab === 'purchases' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      <History size={16} />
                      Purchases
                    </button>
                    <button 
                      onClick={() => setHistorySubTab('chats')}
                      className={`flex items-center gap-2 text-sm font-bold transition-colors ${historySubTab === 'chats' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      <MessageSquare size={16} />
                      AI Chats
                    </button>
                  </div>

                  {historySubTab === 'purchases' ? (
                    <div className="space-y-4">
                      {MOCK_PURCHASES.map((order) => (
                        <div key={order.id} className="p-4 rounded-2xl border border-stone-100 hover:border-emerald-200 transition-all group">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-500">
                                <ShoppingBag size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-stone-900">{order.productName}</h4>
                                <p className="text-xs text-stone-400">Order ID: {order.id}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-black text-stone-900">${order.price.toFixed(2)}</p>
                              <p className="text-[10px] text-stone-400 uppercase font-bold">
                                {new Date(order.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {MOCK_CHATS.map((chat) => (
                        <div key={chat.id} className="p-4 rounded-2xl border border-stone-100 hover:border-emerald-200 transition-all group cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-stone-900 flex items-center gap-2">
                              {chat.title}
                              <ExternalLink size={12} className="text-stone-300 group-hover:text-emerald-500" />
                            </h4>
                            <span className="text-[10px] text-stone-400 font-bold">
                              {new Date(chat.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-stone-500 line-clamp-1 italic">"{chat.lastMessage}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button className="w-full mt-12 py-4 rounded-2xl border border-stone-100 text-stone-500 font-bold text-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
              {activeTab === 'timeline' ? 'Load More Activities' : 'View Full History'}
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
