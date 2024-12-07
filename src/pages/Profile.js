import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container
      className="py-5 text-center"
      style={{
        maxWidth: "400px",
        backgroundColor: "#FFF2E1",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#A79277", marginBottom: "20px" }}>Profil</h1>
      {user ? (
        <>
          <p style={{ fontSize: "18px", color: "#D1BB9E" }}>
            <strong>Email :</strong> {user.email}
          </p>
          <Button
            variant="danger"
            onClick={logout}
            style={{
              backgroundColor: "#A79277",
              borderColor: "#A79277",
              color: "#FFF2E1",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Se déconnecter
          </Button>
        </>
      ) : (
        <p style={{ color: "#A79277" }}>
          Veuillez vous connecter pour voir votre profil.
        </p>
      )}
    </Container>
  );
}

export default Profile;
