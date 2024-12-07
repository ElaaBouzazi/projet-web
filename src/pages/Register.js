import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      console.log("Tentative d'inscription...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Utilisateur créé :", user);

      // Mise à jour du profil utilisateur
      await updateProfile(user, { displayName: name });
      console.log("Profil mis à jour avec le nom :", name);

      // Enregistrement des données dans Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "user",
      });
      console.log("Données utilisateur sauvegardées dans Firestore.");

      navigate("/home");
    } catch (error) {
      console.error("Erreur complète :", error);
      setError(
        error.message || "Une erreur s'est produite lors de l'inscription."
      );
    }
  };

  return (
    <Container
      className="py-5"
      style={{
        backgroundColor: "#FFF2E1", // Fond clair et chaleureux
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        marginTop: "100px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Légère ombre pour un effet de relief
      }}
    >
      <h1 style={{ color: "#A79277", marginBottom: "20px" }}>
        Créer un compte
      </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#A79277" }}>Nom</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
            required
            style={{
              backgroundColor: "#F5E4D0",
              borderColor: "#A79277",
              color: "#A79277",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#A79277" }}>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
            style={{
              backgroundColor: "#F5E4D0",
              borderColor: "#A79277",
              color: "#A79277",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "#A79277" }}>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez un mot de passe"
            required
            style={{
              backgroundColor: "#F5E4D0",
              borderColor: "#A79277",
              color: "#A79277",
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#A79277",
            borderColor: "#A79277",
            color: "#FFF2E1",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          S'inscrire
        </Button>
      </Form>
      <p className="mt-3" style={{ color: "#A79277" }}>
        Déjà inscrit ?{" "}
        <a href="/login" style={{ color: "#A79277" }}>
          Connectez-vous
        </a>
        .
      </p>
    </Container>
  );
}

export default Register;
