import React, { useEffect, useState } from "react";
import { db, collection, getDocs, doc, deleteDoc } from "../firebase.config"; // Importation correcte de Firebase

import Plot from "react-plotly.js"; // Importation de Plotly

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [users, setUsers] = useState([]);

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ ...doc.data(), id: doc.id });
    });
    setProducts(productsData);
  };

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = [];
    querySnapshot.forEach((doc) => {
      usersData.push({ ...doc.data(), id: doc.id });
    });
    setUsers(usersData);
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId)); // Suppression de l'utilisateur par son ID
      alert("Utilisateur supprimé avec succès");
      fetchUsers(); // Recharger les utilisateurs après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      alert("Erreur lors de la suppression de l'utilisateur");
    }
  };

  // Fonction pour supprimer un produit
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId)); // Suppression du produit par son ID
      alert("Produit supprimé avec succès");
      fetchProducts(); // Recharger les produits après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("Erreur lors de la suppression du produit");
    }
  };

  // Traiter les données (comptabiliser par catégorie)
  const processData = (products, cartItems) => {
    const categoryCounts = {};
    const categoryPrices = {};

    products.forEach((product) => {
      const category = product.category;
      const price = product.price;

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      categoryPrices[category] = (categoryPrices[category] || 0) + price;
    });

    const cartTotals = {};
    cartItems.forEach((item) => {
      const productId = item.product_id;
      const quantity = item.quantity;

      const product = products.find((p) => p.id === productId);
      if (product) {
        const totalPrice = product.price * quantity;
        cartTotals[productId] = (cartTotals[productId] || 0) + totalPrice;
      }
    });

    return { categoryCounts, categoryPrices, cartTotals };
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const { categoryCounts, categoryPrices, cartTotals } = processData(
    products,
    cartItems
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tableau de bord Admin</h1>

      {/* Graphique 1 - Répartition des produits par catégorie */}
      <Plot
        data={[
          {
            type: "pie",
            labels: Object.keys(categoryCounts),
            values: Object.values(categoryCounts),
          },
        ]}
        layout={{
          title: "Répartition des produits par catégorie",
          autosize: true,
        }}
        style={{
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      />

      {/* Graphique 2 - Total des prix des produits par catégorie */}
      <Plot
        data={[
          {
            type: "bar",
            x: Object.keys(categoryPrices),
            y: Object.values(categoryPrices),
          },
        ]}
        layout={{
          title: "Total des prix des produits par catégorie",
          autosize: true,
        }}
        style={{
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      />

      {/* Graphique 3 - Total des prix des produits dans le panier */}
      <Plot
        data={[
          {
            type: "bar",
            x: Object.keys(cartTotals),
            y: Object.values(cartTotals),
          },
        ]}
        layout={{
          title: "Total des prix des produits dans le panier",
          autosize: true,
        }}
        style={{
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      />

      {/* Table des utilisateurs */}
      <h2>Utilisateurs</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table des produits */}
      <h2>Produits</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price} €</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
