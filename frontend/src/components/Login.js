import React, { useState } from 'react';
import NoEmptyError from './NoEmptyError';
import { api } from '../lib/api';
import Switch from '@mui/material/Switch'; 
import "../css/Login.css";



const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function login(evt) {
    evt.preventDefault();

    const data = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    };

    api('Login', data)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.message);
        } else {
          console.log(json.authorizationToken);
        }
      })
      .catch((e) => {
        if (e.message) {
          setError(e.message);
        } else {
          setError(String(e));
        }
      });

    console.log(data);
  }

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="login" className='LoginDIV'>
      <form onSubmit={login}>
        <div className="form-structor">
          <div className="signup">
            <h2 className="form-title" id="signup">Iniciar Sesión</h2>
            <div className="form-holder">
              <input type="text" className="input" name="username" id="username" placeholder="Nombre" />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="input"
                  placeholder="Contraseña"
                />
                {/*<Switch
                  checked={showPassword}
                  onChange={handleToggleShowPassword}
                  size="small"
                  color="primary"
                />*/}
              </div>
              <NoEmptyError msg={error} />
            </div>
            <button className="submit-btn">Entrar</button>
          </div>
          <div className="login slide-up">
            <div className="center">
              <h2 className="form-title" id="loginBTN"><span>o</span>Registrarse</h2>
              <div className="form-holder">
                <input type="text" className="input" name="usernameRegister" id="usernameRegister" placeholder="Nombre" />
                <input type="password" className="input" name="PasswordRegister" id="PasswordRegister" placeholder="Contraseña" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
