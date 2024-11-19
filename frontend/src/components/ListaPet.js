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
import ModalYesNo from './ModalYesNo'; // Componente de confirmación de eliminación

const PetListBody = () => {
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

    // Cargar la lista de usuarios desde la API
    loadPets();
  }, [navigate]);

  // Función para cargar los usuarios
  const loadPets = () => {
    Api.get('pet')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(petList => {
        console.log(petList)
        
        const petRows = petList.map(pet => {

          return (
            <tr key={pet.uuid}>
              <td>{pet.nombre}</td>
              <td>{pet.descripcion}</td>
              <td>
              <img 
                src={pet.imagen} 
                alt={pet.nombre} 
                style={{ width: '100px', height: 'auto' }} // Ajusta el tamaño según lo necesites
              />
            </td>
              <td className="actions">
                <Link to={`/PetForm/${pet.uuid}`}>
                  <IconEdit className="icon button" />
                </Link>
                <IconDelete 
                  className="icon button" 
                  onClick={(e) => handleDeleteClick(e, pet.uuid)} 
                />
              </td>
            </tr>
          );
        });
        setFilas(petRows);
      })
      .catch(error => {
        console.error("Error fetching animals:", error);
      });
  };

  // Función que muestra el modal de confirmación de eliminación
  const handleDeleteClick = (e, uuid) => {
    e.preventDefault();
    setDeletingUuid(uuid);
    setShowDeleteConfirmation(true);
  };

  // Función para confirmar y eliminar el usuario
  const deleteCurrentUserUuid = () => {
    setShowDeleteConfirmation(false);
    Api.delete(`pet/${deletingUuid}`)
      .then(() => {
        alert('Animal eliminado');
        loadPets(); // Recarga la lista de usuarios después de eliminar
      })
      .catch(e => {
        console.error("Error deleting pet:", e);
      });
  };

  return (
    <div>
      <table className="table-data-list">
        <caption>
          <IconUsers className="icon" />
          Usuarios
          <Link to='/petform'>
            <IconAdd className="icon button" alt="agregar" title="Agregar mascota" />
          </Link>
        </caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Imagen</th>
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
        message="¿Desea eliminar mascota?"
        show={showDeleteConfirmation}
        onYes={deleteCurrentUserUuid}
        onNo={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
};

const ListaPet = () => (
  <div>
    <Header />
    <PetListBody />
  </div>
);

export default ListaPet;

