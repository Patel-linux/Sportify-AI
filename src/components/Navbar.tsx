import React from 'react';
import { User } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile } from '../types';
import { Trophy, ShoppingCart, User as UserIcon, LogOut, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  user: User | null;
  profile: UserProfile | null;
}

export default function Navbar({ user, profile }: NavbarProps) {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    setLoginError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/popup-blocked') {
        setLoginError("Popup blocked! Please allow popups for this site to sign in.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        setLoginError("Login cancelled. Please try again.");
      } else {
        setLoginError("Login failed. Please check your connection and try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
      {loginError && (
        <div className="bg-red-500 text-white text-xs py-2 px-4 text-center animate-in slide-in-from-top duration-300">
          {loginError}
          <button onClick={() => setLoginError(null)} className="ml-2 font-bold underline">Dismiss</button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="bg-emerald-500 p-2 rounded-lg text-white"
            >
              <Trophy size={20} />
            </motion.div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tighter text-stone-900">SPORTIFY AI</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded border border-stone-200">v1.0.0</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text" 
                placeholder="Search gear, brands, sports..."
                className="w-full bg-stone-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-stone-600 hover:text-emerald-600 transition-colors relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium">{profile?.displayName}</span>
                  <span className="text-xs text-stone-500">Athlete</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-stone-600 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="bg-stone-900 text-white px-6 py-2 rounded-full font-medium hover:bg-stone-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
