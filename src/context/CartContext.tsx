import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../services/firestoreError';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  // Sync with Firestore
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    if (!user) {
      setCart([]);
      return () => unsubscribeAuth();
    }

    const cartRef = collection(db, 'users', user.uid, 'cart');
    const unsubscribeSnapshot = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as CartItem);
      setCart(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/cart`);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, [user]);

  const addToCart = async (product: Product) => {
    if (!user) {
      // Local only if not logged in
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      return;
    }

    const itemRef = doc(db, 'users', user.uid, 'cart', product.id);
    const existingItem = cart.find(item => item.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    
    try {
      await setDoc(itemRef, { ...product, quantity });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/cart/${product.id}`);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      return;
    }

    const itemRef = doc(db, 'users', user.uid, 'cart', productId);
    try {
      await deleteDoc(itemRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/cart/${productId}`);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (!user) {
      setCart(prevCart => prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
      return;
    }

    const itemRef = doc(db, 'users', user.uid, 'cart', productId);
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    try {
      await setDoc(itemRef, { ...item, quantity });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/cart/${productId}`);
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const cartRef = collection(db, 'users', user.uid, 'cart');
    const batch = writeBatch(db);
    cart.forEach(item => {
      batch.delete(doc(cartRef, item.id));
    });

    try {
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/cart`);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
