import React from 'react';
import { useNavigate } from 'react-router-dom';

const Salir = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos de autenticación en localStorage
    localStorage.removeItem("roles");
    localStorage.removeItem("token"); // o cualquier otra clave relacionada con la sesión

    // Redirigir al Home ("/")
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="salir-button">
      Salir
    </button>
  );
};

export default Salir;

