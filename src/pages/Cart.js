import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate

function Cart() {
  const {
    cart,
    removeFromCart,
    saveCartToFirebase,
    updateCartStatus,
    resetCart, // Assurez-vous d'avoir une fonction pour réinitialiser le panier dans le contexte
    cartStatus,
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryMonth, setCardExpiryMonth] = useState("01");
  const [cardExpiryYear, setCardExpiryYear] = useState(
    new Date().getFullYear()
  );
  const [cardCVC, setCardCVC] = useState("");

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Fonction pour envoyer l'email via EmailJS
  const sendConfirmationEmail = (templateParams) => {
    emailjs
      .send(
        "service_517d9tk", // Remplacez par votre Service ID
        "template_1gnm0vb", // Remplacez par votre Template ID
        templateParams,
        "llF3LmqXswdfbb_NI" // Remplacez par votre User ID
      )
      .then(
        (response) => {
          console.log("E-mail envoyé avec succès", response);
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'email", error);
        }
      );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // S'assurer que l'utilisateur est bien connecté
    if (!user) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }

    // Préparer les données de commande
    const templateParams = {
      user_name: user.displayName || "Client", // Nom de l'utilisateur
      user_email: user.email, // E-mail de l'utilisateur
      address,
      deliveryMethod,
      paymentMethod,
      total: calculateTotal(),
      cardHolderName,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardCVC,
    };

    try {
      // Envoyer l'e-mail via EmailJS
      await sendConfirmationEmail(templateParams);

      // Sauvegarder le panier dans Firebase et mettre à jour son statut
      await saveCartToFirebase(user.uid);
      await updateCartStatus(user.uid, "confirmed");

      // Réinitialiser le panier
      resetCart();

      // Rediriger vers la page des produits
      navigate("/products"); // Assurez-vous que cette route est correcte

      setOrderConfirmed(true);
      setShowOrderForm(false);
      alert("Commande confirmée ! Un email de confirmation a été envoyé.");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Une erreur est survenue lors de l'envoi de l'email.");
    }
  };

  return (
    <Container className="py-5">
      <h1>Mon Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cart.map((product, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={8}>
                    <h5>{product.name}</h5>
                    <p>Prix: {product.price} €</p>
                    <p>Quantité: {product.quantity}</p>
                  </Col>
                  <Col md={4} className="text-end">
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Retirer
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h4>Total: {calculateTotal()} €</h4>
          {cartStatus === "confirmed" ? (
            <Alert variant="success">
              Commande confirmée ! Un email de confirmation a été envoyé.
            </Alert>
          ) : (
            <Button variant="primary" onClick={() => setShowOrderForm(true)}>
              Passer la commande
            </Button>
          )}
        </>
      )}

      {/* Modal pour le formulaire de commande */}
      <Modal show={showOrderForm} onHide={() => setShowOrderForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Passer une commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderConfirmed && (
            <Alert variant="success">
              Commande confirmée ! Un email de confirmation a été envoyé.
            </Alert>
          )}
          <Form onSubmit={handlePlaceOrder}>
            <Form.Group className="mb-3">
              <Form.Label>Adresse de livraison</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Entrez votre adresse"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mode de livraison</Form.Label>
              <Form.Select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Moyen de paiement</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit_card">Carte bancaire</option>
                <option value="cash_on_delivery">
                  Paiement à la livraison
                </option>
              </Form.Select>
            </Form.Group>

            {paymentMethod === "credit_card" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nom du porteur de la carte</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    placeholder="Nom du titulaire"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Numéro de la carte</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Numéro de carte"
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date d'expiration (Mois)</Form.Label>
                      <Form.Select
                        value={cardExpiryMonth}
                        onChange={(e) => setCardExpiryMonth(e.target.value)}
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option key={month} value={month}>
                              {month < 10 ? `0${month}` : month}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date d'expiration (Année)</Form.Label>
                      <Form.Select
                        value={cardExpiryYear}
                        onChange={(e) => setCardExpiryYear(e.target.value)}
                      >
                        {Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() + i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    placeholder="Code CVC"
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button type="submit" variant="success" className="w-100">
              Confirmer la commande
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Cart;
