import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Vous devez être connecté pour ajouter un produit !");
        return;
      }

      await addDoc(collection(db, "products"), {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        stock,
        addedBy: user.uid,
      });

      alert("Produit ajouté avec succès !");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageUrl("");
      setStock(1);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <Container
      className="py-5 text-center"
      style={{ backgroundColor: "#FFF2E1", borderRadius: "10px" }}
    >
      <h1 style={{ color: "#A79277", marginBottom: "20px" }}>
        Ajouter un produit
      </h1>
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Nom</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ borderColor: "#EAD8C0" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ borderColor: "#EAD8C0" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Prix (dt)</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ borderColor: "#EAD8C0" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Catégorie</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ borderColor: "#EAD8C0" }}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="bijoux">Bijoux</option>
            <option value="makeup">Makeup</option>
            <option value="skincare">Skincare</option>
            <option value="parfum">Parfum</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ borderColor: "#EAD8C0" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#D1BB9E" }}>Stock</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            min="1"
            style={{ borderColor: "#EAD8C0" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#A79277",
            borderColor: "#A79277",
            color: "#FFF2E1",
          }}
        >
          Ajouter
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
