import { collection, getDocs, addDoc, query, where, limit, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../types";

const PRODUCTS_COLLECTION = "products";

export const getProducts = async (category?: string) => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  let q = query(productsRef);
  
  if (category) {
    q = query(productsRef, where("category", "==", category));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductById = async (id: string) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
};

export const seedProducts = async () => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  
  const initialProducts = [
    {
      name: "Pro Run 2000",
      brand: "Speedster",
      category: "Running",
      price: 135,
      rating: 4.8,
      reviewsCount: 150,
      description: "High-performance running shoes with advanced cushioning.",
      imageUrl: "https://picsum.photos/seed/shoes/400/400",
      features: ["Breathable mesh", "Responsive foam", "Durable rubber sole"]
    },
    {
      name: "Trail Blazer X",
      brand: "Speedster",
      category: "Running",
      price: 150,
      rating: 4.7,
      reviewsCount: 95,
      description: "Rugged trail running shoes for all-terrain performance.",
      imageUrl: "https://picsum.photos/seed/trail/400/400",
      features: ["Gore-Tex waterproof", "Deep lug traction", "Reinforced toe cap"]
    },
    {
      name: "Cloud Walker",
      brand: "Nimbus",
      category: "Running",
      price: 160,
      rating: 4.9,
      reviewsCount: 210,
      description: "Ultra-lightweight marathon shoes with carbon plate technology.",
      imageUrl: "https://picsum.photos/seed/cloud/400/400",
      features: ["Carbon fiber plate", "Super-critical foam", "Minimalist upper"]
    },
    {
      name: "Master Blaster Willow",
      brand: "CricketPro",
      category: "Cricket",
      price: 275,
      rating: 4.9,
      reviewsCount: 85,
      description: "Grade 1 English Willow bat for professional play.",
      imageUrl: "https://picsum.photos/seed/cricket/400/400",
      features: ["Large sweet spot", "Lightweight pickup", "Premium grip"]
    },
    {
      name: "Elite Strike Ball",
      brand: "GoalMaster",
      category: "Football",
      price: 55,
      rating: 4.5,
      reviewsCount: 200,
      description: "FIFA Quality Pro certified match ball.",
      imageUrl: "https://picsum.photos/seed/football/400/400",
      features: ["Textured surface", "High air retention", "Consistent flight"]
    },
    {
      name: "PowerLift Dumbbells (Set of 2)",
      brand: "IronCore",
      category: "Gym",
      price: 95,
      rating: 4.7,
      reviewsCount: 320,
      description: "Rubber-coated hex dumbbells for home and gym use.",
      imageUrl: "https://picsum.photos/seed/gym/400/400",
      features: ["Anti-roll design", "Comfortable grip", "Floor protection"]
    }
  ];

  for (const product of initialProducts) {
    const q = query(productsRef, where("name", "==", product.name));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      await addDoc(productsRef, product);
    } else {
      // Update existing product price
      const existingDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, PRODUCTS_COLLECTION, existingDoc.id), {
        price: product.price
      });
    }
  }
  console.log("Products seeded/updated successfully");
};
