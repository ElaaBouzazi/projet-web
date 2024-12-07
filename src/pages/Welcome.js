// src/Welcome.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { translations } from "./translations"; // Importer les traductions

function Welcome() {
  const [language, setLanguage] = useState("fr"); // Langue par défaut
  const navigate = useNavigate();

  const t = (key) => translations[language][key];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8D6C1, #BFA58F)", // Sable plus foncé
        overflow: "hidden", // Masque tout débordement
      }}
    >
      {/* Lignes courbées en arrière-plan */}
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        width="100%"
        height="200px"
        preserveAspectRatio="none"
      >
        <path
          fill="#C8B098"
          fillOpacity="0.6"
          d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>

      {/* Conteneur principal */}
      <Container
        className="text-center py-5"
        style={{
          position: "relative",
          backgroundColor: "#F5E4D0", // Fond clair pour contraster avec le fond
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          marginTop: "100px",
          boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)", // Ombre plus prononcée
          zIndex: 1,
        }}
      >
        <h1 style={{ color: "#A17E5F", marginBottom: "20px" }}>
          {t("welcome")}
        </h1>
        <p style={{ color: "#B39B87", fontSize: "18px" }}>{t("message")}</p>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            className="mx-2"
            style={{
              backgroundColor: "#A17E5F", // Boutons assortis
              borderColor: "#A17E5F",
              color: "#F5E4D0",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {t("login")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/register")}
            className="mx-2"
            style={{
              backgroundColor: "#B39B87",
              borderColor: "#B39B87",
              color: "#F5E4D0",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {t("register")}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
