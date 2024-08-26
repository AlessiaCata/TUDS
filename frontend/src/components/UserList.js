import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    api('user', 'GET')
      .then(res => res.json())
      .then(userList => {
        setFilas(userList.map(user => {
          let check, enabled, color;

          if (user.isEnabled) {
            check = IconDisable;
            enabled = IconEnable;
            color = 'success';
          } else {
            check = IconEnable;
            enabled = IconDisable;
            color = 'error';
          }

          return (
            <tr key={user.uuid}>
              <td>{user.username}</td>
              <td>{user.displayName}</td>
              <td className="center">
                <SvgIcon className={color + " icon"} component={enabled} />
              </td>
              <td>{user.roles}</td>
              <td className="actions">
                <a href="/user">
                  <SvgIcon className="icon button" component={check} />
                </a>
                <a href="/user">
                  <IconEdit className="icon button" />
                </a>
                <a href="/user">
                  <IconDelete className="icon button" />
                </a>
              </td>
            </tr>
          );
        }));
      });
  }, []);

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
          {filas}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
