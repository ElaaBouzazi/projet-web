import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Vérifier l'état d'authentification de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "ela.bouzazi@gmail.com") {
          navigate("/admindashboard"); // Redirige vers le tableau de bord administrateur
        } else {
          navigate("/home"); // Redirige vers la page utilisateur normale
        }
      }
    });

    // Nettoyer l'abonnement à l'état d'authentification à la déconnexion
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Email ou mot de passe incorrect.");
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Container className="py-5">
      <h1>Connexion</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
      <p className="mt-3">
        Pas encore de compte ? <a href="/register">Inscrivez-vous</a>.
      </p>
    </Container>
  );
}

export default Login;
