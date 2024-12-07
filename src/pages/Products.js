import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { CartContext } from "../context/CartContext";
import { translations } from "./translations"; // Importer les traductions

// Fonction t pour obtenir la traduction selon la langue choisie
const t = (key, lang = "fr") => {
  return translations[lang] ? translations[lang][key] : key;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [language, setLanguage] = useState("fr"); // Langue par défaut
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <div>{t("loading", language)}</div>; // Utilisation de la fonction t pour le texte de chargement
  }

  const handleQuantityChange = (productId, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(
                Math.min(product.quantity + change, product.stock), // Ne dépasse pas le stock
                1
              ),
            }
          : product
      )
    );
  };

  return (
    <Container className="py-5">
      <h1>{t("productTitle", language)}</h1>{" "}
      {/* Utilisation de la fonction t pour le titre */}
      <Form.Group className="mb-4">
        <Form.Label>{t("categoryFilterLabel", language)}</Form.Label>{" "}
        {/* Utilisation de la fonction t pour le label */}
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">{t("allCategories", language)}</option>{" "}
          {/* Option traduite */}
          {[...new Set(products.map((product) => product.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </Form.Select>
      </Form.Group>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>
                    {t("priceLabel", language)} {product.price} dt
                  </strong>{" "}
                  {/* Prix traduit */}
                </Card.Text>
                <div className="d-flex align-items-center">
                  {/* Flèche pour augmenter la quantité */}
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(product.id, 1)}
                    style={{ marginRight: "10px" }}
                    disabled={product.quantity >= product.stock} // Désactive si la quantité atteint le stock max
                  >
                    &#8593; {t("quantityIncrease", language)}
                  </Button>
                  <span>{product.quantity}</span>
                </div>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  {t("addToCart", language)} {/* Traduction du bouton */}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
