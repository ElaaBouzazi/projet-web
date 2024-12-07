import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Création du contexte AuthContext
export const AuthContext = createContext();

// Fournisseur du contexte AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Informations utilisateur
  const [role, setRole] = useState(null); // Rôle de l'utilisateur
  const [loading, setLoading] = useState(true); // Chargement des données

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Écoute des changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Récupération du document utilisateur depuis Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              ...userDoc.data(),
            });
            setRole(userDoc.data().role || null); // Récupérer le rôle ou `null` par défaut
          } else {
            console.warn("Aucun document trouvé pour cet utilisateur.");
            setUser(null);
            setRole(null);
          }
        } else {
          // Si l'utilisateur est déconnecté
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false); // Chargement terminé
      }
    });

    // Nettoyage de l'écoute lors du démontage du composant
    return () => unsubscribe();
  }, [auth, db]);

  // Fonction pour gérer la déconnexion
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, logout, loading }}>
      {!loading ? children : <div>Chargement...</div>}
    </AuthContext.Provider>
  );
};
