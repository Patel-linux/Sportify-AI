import { collection, getDocs, addDoc, query, where, limit, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../types";
import { handleFirestoreError, OperationType } from "./firestoreError";

const PRODUCTS_COLLECTION = "products";

export const getProducts = async (category?: string) => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  let q = query(productsRef);
  
  if (category) {
    q = query(productsRef, where("category", "==", category));
  }
  
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
    return [];
  }
};

export const getProductById = async (id: string) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${PRODUCTS_COLLECTION}/${id}`);
    return null;
  }
};

export const seedProducts = async () => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  
  const initialProducts = [
    {
      name: "Pro Run 2000",
      brand: "Speedster",
      category: "Running",
      price: 135,
      rating: 9.6,
      reviewsCount: 150,
      description: "High-performance running shoes with advanced cushioning.",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      features: ["Breathable mesh", "Responsive foam", "Durable rubber sole"]
    },
    {
      name: "Trail Blazer X",
      brand: "Speedster",
      category: "Running",
      price: 150,
      rating: 9.4,
      reviewsCount: 95,
      description: "Rugged trail running shoes for all-terrain performance.",
      imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
      features: ["Gore-Tex waterproof", "Deep lug traction", "Reinforced toe cap"]
    },
    {
      name: "Cloud Walker",
      brand: "Nimbus",
      category: "Running",
      price: 160,
      rating: 9.8,
      reviewsCount: 210,
      description: "Ultra-lightweight marathon shoes with carbon plate technology.",
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
      features: ["Carbon fiber plate", "Super-critical foam", "Minimalist upper"]
    },
    {
      name: "Master Blaster Willow",
      brand: "CricketPro",
      category: "Cricket",
      price: 275,
      rating: 9.8,
      reviewsCount: 85,
      description: "Grade 1 English Willow bat for professional play.",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
      features: ["Large sweet spot", "Lightweight pickup", "Premium grip"]
    },
    {
      name: "Elite Strike Ball",
      brand: "GoalMaster",
      category: "Football",
      price: 55,
      rating: 9.0,
      reviewsCount: 200,
      description: "FIFA Quality Pro certified match ball.",
      imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7a0aab?auto=format&fit=crop&q=80&w=800",
      features: ["Textured surface", "High air retention", "Consistent flight"]
    },
    {
      name: "PowerLift Dumbbells (Set of 2)",
      brand: "IronCore",
      category: "Gym",
      price: 95,
      rating: 9.4,
      reviewsCount: 320,
      description: "Rubber-coated hex dumbbells for home and gym use.",
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800",
      features: ["Anti-roll design", "Comfortable grip", "Floor protection"]
    },
    {
      name: "Court King Pro",
      brand: "AceSports",
      category: "Tennis",
      price: 210,
      rating: 9.7,
      reviewsCount: 110,
      description: "Professional grade tennis racket with vibration dampening.",
      imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?auto=format&fit=crop&q=80&w=800",
      features: ["Graphite frame", "Large head size", "Balanced weight"]
    },
    {
      name: "Hoop Master 5",
      brand: "DunkIt",
      category: "Basketball",
      price: 145,
      rating: 9.5,
      reviewsCount: 180,
      description: "High-top basketball shoes with superior ankle support.",
      imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=800",
      features: ["Air cushion", "Non-slip grip", "Breathable fabric"]
    }
  ];

  try {
    for (const product of initialProducts) {
      const q = query(productsRef, where("name", "==", product.name));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await addDoc(productsRef, product);
      } else {
        // Update existing product price and rating
        const existingDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, PRODUCTS_COLLECTION, existingDoc.id), {
          price: product.price,
          rating: product.rating
        });
      }
    }
    console.log("Products seeded/updated successfully");
  } catch (error) {
    // Gracefully handle permission errors during seeding
    if (error instanceof Error && error.message.includes("insufficient permissions")) {
      console.warn("Seeding skipped: Current user does not have permission to modify products.");
    } else {
      console.error("Seeding failed:", error);
    }
  }
};
