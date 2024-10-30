import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import SvgIcon from '@mui/material/SvgIcon';
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import IconEnable from '@mui/icons-material/CheckCircle';
import IconDisable from '@mui/icons-material/Cancel';
import IconAdd from '@mui/icons-material/Add';
import IconUsers from '@mui/icons-material/People';

const UserList = () => {
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authorizationToken");
    if (!token) {
      navigate("/login");
      return;
    }

    api('user', 'GET')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(userList => {
        const userRows = userList.map(user => {
          const checkIcon = user.isEnabled ? IconDisable : IconEnable;
          const enabledIcon = user.isEnabled ? IconEnable : IconDisable;
          const color = user.isEnabled ? 'success' : 'error';

          return (
            <tr key={user.uuid}>
              <td>{user.username}</td>
              <td>{user.displayName}</td>
              <td className="center">
                <SvgIcon className={`${color} icon`} component={enabledIcon} />
              </td>
              <td>{user.roles.join(', ')}</td>
              <td className="actions">
                <Link to={`/user/${user.uuid}/enable`}>
                  <SvgIcon className="icon button" component={checkIcon} />
                </Link>
                <Link to={`/user/${user.uuid}/edit`}>
                  <IconEdit className="icon button" />
                </Link>
                <Link to={`/user/${user.uuid}/delete`}>
                  <IconDelete className="icon button" />
                </Link>
              </td>
            </tr>
          );
        });
        setFilas(userRows); // Asignar las filas aquí
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        // Mostrar mensaje de error al usuario
      });
  }, [navigate]);

  return (
    <div>
      <table className="table-data-list">
        <caption>
          <IconUsers className="icon" />
          Usuarios
          <Link to='/user-form'>
            <IconAdd className="icon button" alt="agregar" title="Agregar usuario" />
          </Link>
        </caption>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Habilitado</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filas.length > 0 ? filas : <tr><td colSpan="5">Cargando usuarios...</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
