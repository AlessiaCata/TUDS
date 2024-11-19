import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/PetList.css"; // Archivo CSS para el estilo
import SvgIcon from '@mui/material/SvgIcon';
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import IconAdd from '@mui/icons-material/Add';
import ModalYesNo from './ModalYesNo'; // Componente de confirmación de eliminación

const MascotaListBody = () => {
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      navigate("/login");
      return;
    }

    // Cargar la lista de mascotas desde la API
    loadMascotas();
  }, [navigate]);

  // Función para cargar las mascotas
  const loadMascotas = () => {
    Api.get('mascota')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(mascotaList => {
        const mascotaRows = mascotaList.map(mascota => {
          return (
            <tr key={mascota.id}>
              <td>{mascota.id}</td>
              <td>{mascota.nombre}</td>
              <td>{mascota.descripcion}</td>
              <td>
                <img src={mascota.imagen} alt={mascota.nombre} className="mascota-image" />
              </td>
              <td className="actions">
                <Link to={`/petform/${mascota.id}`}>
                  <IconEdit className="icon button" />
                </Link>
                <IconDelete 
                  className="icon button" 
                  onClick={(e) => handleDeleteClick(e, mascota.id)} 
                />
              </td>
            </tr>
          );
        });
        setFilas(mascotaRows);
      })
      .catch(error => {
        console.error("Error fetching mascotas:", error);
      });
  };

  // Función que muestra el modal de confirmación de eliminación
  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    setDeletingId(id);
    setShowDeleteConfirmation(true);
  };

  // Función para confirmar y eliminar la mascota
  const deleteCurrentMascotaId = () => {
    setShowDeleteConfirmation(false);
    Api.delete(`mascota/${deletingId}`)
      .then(() => {
        alert('Mascota eliminada');
        loadMascotas(); // Recarga la lista de mascotas después de eliminar
      })
      .catch(e => {
        console.error("Error deleting mascota:", e);
      });
  };

  return (
    <div>
      <table className="table-data-list">
        <caption>
          Mascotas
          <Link to="/petform">
            <IconAdd className="icon button" alt="agregar" title="Agregar mascota" />
          </Link>
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filas.length > 0 ? (
            filas
          ) : (
            <tr>
              <td colSpan="5" className="center">Cargando mascotas...</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalYesNo
        message="¿Desea eliminar la mascota?"
        show={showDeleteConfirmation}
        onYes={deleteCurrentMascotaId}
        onNo={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
};

const MascotaList = () => (
  <div>
    <Header />
    <MascotaListBody />
  </div>
);

export default MascotaList;
