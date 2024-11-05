import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/UserList.css";
import SvgIcon from '@mui/material/SvgIcon';
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import IconEnable from '@mui/icons-material/CheckCircle';
import IconDisable from '@mui/icons-material/Cancel';
import IconAdd from '@mui/icons-material/Add';
import IconUsers from '@mui/icons-material/People';
import ModalYesNo from './ModalYesNo'; // Asegúrate de tener este componente para la confirmación de eliminación

const UserListBody = () => {
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingUuid, setDeletingUuid] = useState('');    

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      navigate("/login");
      return;
    }

    Api.get('user')
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

          // Asegúrate de que roles sea un array antes de llamar a join
          const rolesDisplay = Array.isArray(user.roles) ? user.roles.join(', ') : user.roles || '';

          return (
            <tr key={user.uuid}>
              <td>{user.username}</td>
              <td>{user.displayName}</td>
              <td className="center">
                <SvgIcon className={`${color} icon`} component={enabledIcon} />
              </td>
              <td>{rolesDisplay}</td> {/* Muestra roles aquí */}
              <td className="actions">
                <Link to={`/EditUsuario/${user.uuid}/edit`}>
                  <IconEdit className="icon button" />
                </Link>
                <IconDelete 
                  className="icon button" 
                  onClick={(e) => deleteUser(e, user.uuid)} 
                />
              </td>
            </tr>
          );
        });
        setFilas(userRows);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, [navigate]);

  function deleteUser(e, uuid) {
    e.preventDefault();
    setDeletingUuid(uuid);
    setShowDeleteConfirmation(true);
  }

  function deleteCurrentUserUuid() {
    setShowDeleteConfirmation(false);
    Api.delete('user', { search: { uuid: deletingUuid } })
      .then(() => {
        alert('Usuario eliminado');
        // Lógica para recargar la lista de usuarios, si es necesario
        // Puedes volver a llamar a la API para obtener la lista actualizada
      })
      .catch(e => {
        console.error("Error deleting user:", e);
      });
  }

  return (
    <div>
      <table className="table-data-list">
        <caption>
          <IconUsers className="icon" />
          Usuarios
          <Link to='/userform'>
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
          {filas.length > 0 ? (
            filas
          ) : (
            <tr>
              <td colSpan="5" className="center">Cargando usuarios...</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalYesNo
                message= "Desea eliminar el usuario?"
                show={showDeleteConfirmation}
                onYes={deleteCurrentUserUuid}
                onNo={() => setShowDeleteConfirmation(false)}
            />
    </div>
  );
};

const UserList = () => (
  <div>
    <Header />
    <UserListBody />
  </div>
);

export default UserList;
