import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc, // Ajouter deleteDoc pour supprimer le panier de Firebase si nécessaire
} from "firebase/firestore";

// Créer le CartContext
export const CartContext = createContext();

// Hook personnalisé pour utiliser le CartContext
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartStatus, setCartStatus] = useState("notConfirmed"); // 'notConfirmed' | 'confirmed'

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const saveCartToFirebase = async (userId) => {
    try {
      const cartRef = collection(db, "carts");
      const cartDocRef = await addDoc(cartRef, {
        userId: userId,
        cart,
        status: cartStatus, // Le statut peut être 'notConfirmed' ou 'confirmed'
        createdAt: new Date(),
      });
      console.log("Panier sauvegardé avec l'ID : ", cartDocRef.id);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier : ", error);
    }
  };

  const updateCartStatus = async (userId, status) => {
    setCartStatus(status);
    try {
      const cartsRef = collection(db, "carts");
      const cartSnapshot = await getDocs(cartsRef);
      const cartDoc = cartSnapshot.docs.find(
        (doc) => doc.data().userId === userId
      );
      if (cartDoc) {
        await updateDoc(doc(cartsRef, cartDoc.id), {
          status: status,
        });
        console.log("Panier mis à jour avec le statut : ", status);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du panier : ", error);
    }
  };

  const resetCart = async (userId) => {
    setCart([]); // Réinitialiser le panier local
    setCartStatus("notConfirmed"); // Réinitialiser le statut à 'notConfirmed'
    try {
      const cartsRef = collection(db, "carts");
      const cartSnapshot = await getDocs(cartsRef);
      const cartDoc = cartSnapshot.docs.find(
        (doc) => doc.data().userId === userId
      );
      if (cartDoc) {
        // Si vous voulez supprimer le panier de Firebase, utilisez deleteDoc
        await deleteDoc(doc(cartsRef, cartDoc.id));
        console.log("Panier supprimé de Firebase.");
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du panier : ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        saveCartToFirebase,
        updateCartStatus,
        resetCart, // Fournir resetCart dans le contexte
        cartStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
