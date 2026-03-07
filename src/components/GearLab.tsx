import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Target, Zap, ChevronRight, Sparkles, Trophy, BrainCircuit, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { Product } from '../types';
import { getProducts } from '../services/productService';

interface GearLabProps {
  onAddToCart: (product: Product) => void;
}

export default function GearLab({ onAddToCart }: GearLabProps) {
  const [step, setStep] = useState(1);
  const [sport, setSport] = useState('');
  const [level, setLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const sports = ['Running', 'Cricket', 'Football', 'Gym', 'Tennis', 'Basketball'];
  const levels = ['Beginner', 'Intermediate', 'Professional', 'Elite Athlete'];
  const goals = ['Speed & Agility', 'Power & Strength', 'Endurance', 'Injury Prevention', 'Technical Mastery'];

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const prompt = `As a pro sports performance analyst, provide a technical gear recommendation for a ${level} level ${sport} athlete focusing on ${goal}. 
      Explain what technical features they should look for in their equipment. Keep it concise but professional. 
      Format with markdown. Use bullet points for key features.`;
      
      const [aiReport, allProducts] = await Promise.all([
        getChatResponse(prompt),
        getProducts(sport)
      ]);

      setReport(aiReport);
      // Pick top 2 relevant products
      setRecommendations(allProducts.slice(0, 2));
      setStep(4);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSport('');
    setLevel('');
    setGoal('');
    setReport(null);
    setRecommendations([]);
  };

  return (
    <section className="my-24 relative">
      <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative bg-white border border-stone-200 rounded-[2.5rem] overflow-hidden shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Side: Interactive Lab */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-stone-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-stone-900 p-2.5 rounded-xl text-emerald-500">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Pro Gear Lab</h2>
                <p className="text-xs text-stone-500 font-bold tracking-widest uppercase">AI Performance Scanner v2.4</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-stone-900">Select your primary discipline</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sports.map(s => (
                      <button
                        key={s}
                        onClick={() => { setSport(s); setStep(2); }}
                        className="p-4 rounded-2xl border border-stone-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
                      >
                        <span className="block text-sm font-bold text-stone-900 group-hover:text-emerald-700">{s}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-stone-400 hover:text-stone-900 flex items-center gap-1">
                    ← Back to Sports
                  </button>
                  <h3 className="text-xl font-bold text-stone-900">What is your current level?</h3>
                  <div className="space-y-3">
                    {levels.map(l => (
                      <button
                        key={l}
                        onClick={() => { setLevel(l); setStep(3); }}
                        className="w-full p-4 rounded-2xl border border-stone-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left flex items-center justify-between group"
                      >
                        <span className="font-bold text-stone-900 group-hover:text-emerald-700">{l}</span>
                        <ChevronRight size={18} className="text-stone-300 group-hover:text-emerald-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-stone-400 hover:text-stone-900 flex items-center gap-1">
                    ← Back to Level
                  </button>
                  <h3 className="text-xl font-bold text-stone-900">What is your primary goal?</h3>
                  <div className="space-y-3">
                    {goals.map(g => (
                      <button
                        key={g}
                        onClick={() => { setGoal(g); runAnalysis(); }}
                        className="w-full p-4 rounded-2xl border border-stone-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left flex items-center justify-between group"
                      >
                        <span className="font-bold text-stone-900 group-hover:text-emerald-700">{g}</span>
                        <ChevronRight size={18} className="text-stone-300 group-hover:text-emerald-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-stone-900 text-white p-6 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <Trophy size={80} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Performance Report</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-4">{sport} {level}</h4>
                      <div className="prose prose-invert prose-sm max-w-none text-stone-300 leading-relaxed">
                        {report}
                      </div>
                      <button 
                        onClick={reset}
                        className="mt-6 text-xs font-bold text-emerald-500 hover:text-emerald-400 underline underline-offset-4"
                      >
                        Run New Analysis
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <Loader2 className="text-emerald-500 animate-spin mb-4" size={40} />
                <p className="font-bold text-stone-900 animate-pulse">Analyzing Performance Metrics...</p>
                <p className="text-xs text-stone-500 mt-2">Consulting with AI Sports Experts</p>
              </div>
            )}
          </div>

          {/* Right Side: Recommendations */}
          <div className="bg-stone-50 p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-stone-900">Recommended Gear</h3>
              <div className="flex items-center gap-2 text-stone-400">
                <Target size={16} />
                <span className="text-xs font-medium">Targeted Match</span>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map(product => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-2xl border border-stone-200 flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{product.brand}</span>
                        <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Zap size={12} className="text-emerald-500 fill-emerald-500" />
                          <span className="text-[10px] font-bold text-stone-500 uppercase">Performance Choice</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black text-stone-900">${product.price}</span>
                        <button 
                          onClick={() => onAddToCart(product)}
                          className="bg-stone-900 text-white p-2 rounded-lg hover:bg-emerald-500 transition-colors"
                        >
                          <Activity size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      <strong>Pro Tip:</strong> These items are selected based on your goal of <strong>{goal}</strong>. They offer the specific technical support required for <strong>{level}</strong> level performance.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-stone-400">
                  <Activity size={32} />
                </div>
                <div>
                  <p className="text-stone-500 font-medium">No active scan</p>
                  <p className="text-xs text-stone-400">Complete the lab steps to see recommendations</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
