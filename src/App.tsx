import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { seedProducts } from './services/productService';
import { handleFirestoreError, OperationType } from './services/firestoreError';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Chatbot from './components/Chatbot';
import GearLab from './components/GearLab';
import LiveFeed from './components/LiveFeed';
import ProfilePage from './components/ProfilePage';
import CartPage from './components/CartPage';
import FeaturedPage from './components/FeaturedPage';
import { UserProfile } from './types';
import { useCart } from './context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { addToCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'profile' | 'cart' | 'gearlab' | 'featured'>('home');

  useEffect(() => {
    // Seed initial data
    seedProducts();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userDoc);
          
          if (userSnap.exists()) {
            setProfile(userSnap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'Athlete',
              email: firebaseUser.email || '',
              favorites: [],
              preferences: []
            };
            await setDoc(userDoc, newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <LiveFeed />
      <Navbar user={user} profile={profile} onNavigate={(v) => setView(v)} activeView={view} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero 
                onShopNow={() => setView('featured')}
                onViewCategories={() => setView('gearlab')}
              />
              
              <div id="gearlab">
                <GearLab onAddToCart={addToCart} />
              </div>

              <section id="shop" className="mt-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold tracking-tight">Featured Equipment</h2>
                  <button onClick={() => setView('featured')} className="text-emerald-600 font-bold hover:underline">View All</button>
                </div>
                <ProductGrid user={user} profile={profile} />
              </section>
            </motion.div>
          ) : view === 'profile' ? (
            profile && <ProfilePage profile={profile} onBack={() => setView('home')} />
          ) : view === 'cart' ? (
            <CartPage onBack={() => setView('home')} />
          ) : view === 'gearlab' ? (
            <div className="py-12">
              <button 
                onClick={() => setView('home')}
                className="mb-8 text-sm font-bold text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <GearLab onAddToCart={addToCart} />
            </div>
          ) : (
            <FeaturedPage user={user} profile={profile} onBack={() => setView('home')} />
          )}
        </AnimatePresence>
      </main>

      <Chatbot />
      
      <footer className="bg-stone-900 text-stone-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Sportify AI. Elevate Your Game.</p>
        </div>
      </footer>
    </div>
  );
}
