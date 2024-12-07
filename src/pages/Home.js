import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext"; // Importer le contexte de langue
import { translations } from "./translations"; // Importer les traductions
import image1 from "../images/image1.jfif";
import image2 from "../images/image2.jfif";
import image3 from "../images/image3.jfif";
import image4 from "../images/image4.jfif";

function Home() {
  const { language } = useLang(); // Utiliser le contexte pour obtenir la langue
  const t = (key) => translations[language][key]; // Fonction pour récupérer les traductions

  return (
    <Container
      className="py-5"
      style={{ backgroundColor: "#FFF2E1", borderRadius: "10px" }}
    >
      <Row className="text-center mb-5">
        <Col>
          <h1 style={{ color: "#A79277" }}>{t("welcome_title")}</h1>
          <p className="lead" style={{ color: "#D1BB9E" }}>
            {t("welcome_description")}
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card
            className="mb-4"
            style={{
              backgroundColor: "#EAD8C0",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Img
              variant="top"
              src={image4}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "#A79277" }}>
                {t("popular_category")}
              </Card.Title>
              <Card.Text style={{ color: "#D1BB9E" }}>
                {t("popular_category_description")}
              </Card.Text>
              <Button
                as={Link}
                to="/products"
                style={{
                  backgroundColor: "#A79277",
                  borderColor: "#A79277",
                  color: "#FFF2E1",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#D1BB9E";
                  e.target.style.borderColor = "#D1BB9E";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#A79277";
                  e.target.style.borderColor = "#A79277";
                }}
              >
                {t("see_more")}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="mb-4"
            style={{
              backgroundColor: "#EAD8C0",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Img
              variant="top"
              src={image2}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "#A79277" }}>
                {t("new_arrivals")}
              </Card.Title>
              <Card.Text style={{ color: "#D1BB9E" }}>
                {t("new_arrivals_description")}
              </Card.Text>
              <Button
                as={Link}
                to="/products"
                style={{
                  backgroundColor: "#A79277",
                  borderColor: "#A79277",
                  color: "#FFF2E1",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#D1BB9E";
                  e.target.style.borderColor = "#D1BB9E";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#A79277";
                  e.target.style.borderColor = "#A79277";
                }}
              >
                {t("explore")}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="mb-4"
            style={{
              backgroundColor: "#EAD8C0",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Img
              variant="top"
              src={image1}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "#A79277" }}>
                {t("promotions")}
              </Card.Title>
              <Card.Text style={{ color: "#D1BB9E" }}>
                {t("promotions_description")}
              </Card.Text>
              <Button
                as={Link}
                to="/products"
                style={{
                  backgroundColor: "#A79277",
                  borderColor: "#A79277",
                  color: "#FFF2E1",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#D1BB9E";
                  e.target.style.borderColor = "#D1BB9E";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#A79277";
                  e.target.style.borderColor = "#A79277";
                }}
              >
                {t("see_offers")}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
