import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';

interface CartPageProps {
  onBack: () => void;
}

export default function CartPage({ onBack }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const shipping = cartCount > 0 ? 15 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto py-12 px-4"
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <button
            onClick={onBack}
            className="mb-4 text-sm font-bold text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors"
          >
            ← Continue Shopping
          </button>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tighter">Your Equipment Bag</h1>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <ShieldCheck className="text-emerald-600" size={24} />
          <div>
            <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Secure Checkout</p>
            <p className="text-xs text-emerald-600 font-bold">SSL Encrypted</p>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border border-stone-200 shadow-sm">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 text-stone-300">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Your bag is empty</h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">Looks like you haven't added any performance gear yet. Start your journey by exploring our pro equipment.</p>
          <button
            onClick={onBack}
            className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all active:scale-95"
          >
            Explore Gear
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 group"
                >
                  <div className="w-full sm:w-40 h-40 rounded-3xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1 block">{item.brand}</span>
                        <h3 className="text-xl font-bold text-stone-900">{item.name}</h3>
                        <p className="text-sm text-stone-500 mt-1">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4 bg-stone-100 p-1.5 rounded-2xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-stone-600 hover:text-emerald-500 shadow-sm transition-all active:scale-90"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-black text-stone-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-stone-600 hover:text-emerald-500 shadow-sm transition-all active:scale-90"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Subtotal</p>
                        <p className="text-2xl font-black text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-900 rounded-[3rem] p-10 text-white sticky top-28 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CreditCard size={160} />
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8 relative z-10">Order Summary</h3>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between text-stone-400 font-medium">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400 font-medium">
                  <span>Shipping & Handling</span>
                  <span className="text-white font-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400 font-medium">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10 my-6" />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-stone-500 font-black uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-4xl font-black text-emerald-400">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-900 py-5 rounded-[2rem] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 relative z-10 group">
                Checkout Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-40 grayscale relative z-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
