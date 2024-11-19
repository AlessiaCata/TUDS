import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';

const Salir = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos de autenticación en localStorage
    localStorage.removeItem("roles");
    localStorage.removeItem("token"); // o cualquier otra clave relacionada con la sesión
    delete Api.defaultHeaders.Authorization;
    localStorage.removeItem("Authorization");
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

