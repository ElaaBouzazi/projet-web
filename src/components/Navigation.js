import React, { useState, useContext } from "react";
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaGlobe } from "react-icons/fa";
import { useLang } from "../context/LangContext"; // Contexte pour la langue
import { translations } from "../pages/translations"; // Traductions
import { AuthContext } from "../context/AuthContext"; // Contexte pour l'utilisateur
import { useCart } from "../context/CartContext"; // Contexte pour le panier
import logo from "../images/logomarketplace.png"; // Logo

function Navigation() {
  const { user, logout } = useContext(AuthContext); // Récupération utilisateur et déconnexion
  const { language, changeLanguage } = useLang(); // Langue et fonction de changement
  const { cart } = useCart(); // Contenu du panier

  const t = (key) => translations[language][key]; // Fonction pour traduire

  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setShowLanguageOptions(false);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="mb-4"
      style={{ backgroundColor: "#FFF2E1" }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: "#A79277" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "60px", marginRight: "10px" }}
        />
        ShopSpace
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <>
              <Nav.Link as={Link} to="/home" style={{ color: "#D1BB9E" }}>
                {t("home")}
              </Nav.Link>
              <Nav.Link as={Link} to="/products" style={{ color: "#D1BB9E" }}>
                {t("products")}
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" style={{ color: "#D1BB9E" }}>
                <FaShoppingCart style={{ fontSize: "1.5em" }} />{" "}
                <Badge style={{ backgroundColor: "#FFFFFF", color: "#603F26" }}>
                  {cart.length}
                </Badge>
              </Nav.Link>
              <Nav.Link as={Link} to="/addproduct" style={{ color: "#D1BB9E" }}>
                {t("addProduct")}
              </Nav.Link>
              {/* Afficher le lien tableau de bord si l'utilisateur est admin */}
              {user.role === "admin" && (
                <Nav.Link
                  as={Link}
                  to="/admindashbord"
                  style={{ color: "#D1BB9E" }}
                >
                  {t("admindashbord")}
                </Nav.Link>
              )}
            </>
          )}
        </Nav>
        <div className="d-flex align-items-center position-relative">
          {user ? (
            <>
              <Button
                as={Link}
                to="/profile"
                variant="outline-secondary"
                className="me-2"
                style={{
                  borderColor: "#A79277",
                  color: "#A79277",
                  backgroundColor: "transparent",
                }}
              >
                {t("profile")}
              </Button>
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => setShowLanguageOptions(!showLanguageOptions)}
              >
                <FaGlobe
                  className="me-3"
                  style={{ fontSize: "1.5em", color: "#A79277" }}
                  title="Changer de langue"
                />
                {showLanguageOptions && (
                  <div
                    className="position-absolute"
                    style={{
                      backgroundColor: "#FFF2E1",
                      border: "1px solid #A79277",
                      borderRadius: "5px",
                      padding: "5px",
                      top: "30px",
                      right: "0",
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        cursor: "pointer",
                        color: language === "fr" ? "#A79277" : "#603F26",
                      }}
                      onClick={() => handleLanguageChange("fr")}
                    >
                      Français
                    </div>
                    <div
                      style={{
                        padding: "5px",
                        cursor: "pointer",
                        color: language === "en" ? "#A79277" : "#603F26",
                      }}
                      onClick={() => handleLanguageChange("en")}
                    >
                      Anglais
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="outline-danger"
                onClick={logout}
                style={{
                  borderColor: "#D1BB9E",
                  color: "#FFF2E1",
                  backgroundColor: "#A79277",
                }}
              >
                {t("logout")}
              </Button>
            </>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="primary"
              style={{
                backgroundColor: "#A79277",
                borderColor: "#A79277",
                color: "#FFF2E1",
              }}
            >
              {t("login")}
            </Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
