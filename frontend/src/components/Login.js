import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import NoEmptyError from './NoEmptyError';
import { api } from '../lib/api';
import "../css/Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Instanciar navigate

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const login = async (evt) => {
    evt.preventDefault();
    try {
      const data = { username, password };
      const res = await api('Login', data);
      const json = await res.json();

      if (json.error) {
        setError(json.message);
      } else {
        localStorage.setItem("authorizationToken", json.authorizationToken);
        localStorage.setItem("roles", JSON.stringify(json.roles));
        setError(""); // Limpiar error
        navigate("/UserList"); // Redirigir a UserList
      }
    } catch (e) {
      setError(e.message || String(e));
    }
  };

  return (
    <div id="login" className="LoginDIV">
      <h4>Iniciar Sesión</h4>
      <form onSubmit={login}>
        <div className="text_area">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleInputChange}
            className="text_input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <NoEmptyError msg={error} />
        <input type="submit" value="Entrar" className="btn" />
        <a className="link" href="/signup">Registrarse</a>
      </form>
    </div>

  );
};

export default Login;
