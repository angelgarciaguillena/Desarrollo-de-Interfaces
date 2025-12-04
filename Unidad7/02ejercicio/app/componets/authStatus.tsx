import { useContext } from "react";
import { AuthContext } from "./authContext";

export const AuthStatus = () => {
  const { isLoggedIn, userName, loginUser, logoutUser } =
    useContext(AuthContext);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 20,
        width: 250,
        borderRadius: 8
      }}
    >
      <h2>
        {isLoggedIn ? "✅ Conectado" : "❌ Desconectado"}
      </h2>

      {isLoggedIn && (
        <p>
          <strong>Usuario:</strong> {userName}
        </p>
      )}

      <button
        onClick={() =>
          isLoggedIn ? logoutUser() : loginUser("Angel")
        }
        style={{
          backgroundColor: isLoggedIn ? "red" : "green",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          marginTop: 10
        }}
      >
        {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
      </button>
    </div>
  );
};