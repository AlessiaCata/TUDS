import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import NoEmptyError from './NoEmptyError';
import { Api } from '../lib/Api';
import "../css/Login.css";

const Login = ({ setRoles }) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const login = async (evt) => {
    evt.preventDefault();

    const body = { username, password };

    try {
      const res = await Api.post('login', { body, autoCheck: false });
      const json = await res.json();

      if (json.error) {
        setError(json.message);
      } else {
        const auth = 'Bearer ' + json.authorizationToken;
        const roles = json.roles || [];
        const userUuid = json.uuid;

        // Guardar datos en localStorage
        localStorage.setItem('Authorization', auth);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('uuid', userUuid);

        // Configurar encabezado de autorización
        Api.defaultHeaders.Authorization = auth;
        setRoles(roles);

        // Limpiar error y redirigir
        setError("");
        navigate(-1); // Navegar al perfil del usuario
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
            placeholder="Usuario"
            required
          />
        </div>
        <div className="text_area">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleInputChange}
            className="text_input"
            placeholder="Contraseña"
            required
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
