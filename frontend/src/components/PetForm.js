import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';
import Header from './Header';
import "../css/PetForm.css";

const PetFormBody = () => {
  const { uuid } = useParams();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [tituloDelBoton, setTituloDelBoton] = useState('Agregar Mascota');
  const navigate = useNavigate();

  useEffect(() => {
    if (uuid) {
      setTituloDelBoton('Modificar mascota');
      getPet(uuid);
    } else {
      setTituloDelBoton('Agregar mascota');
    }
  }, [uuid]);

  const getPet = async (uuid) => {
    if (!uuid) return;

    try {
      const res = await Api.fetch(`pet/${uuid}`);
      if (!res.ok) throw new Error('Error al cargar los datos de la mascota');

      const petData = await res.json();
      if (petData.length > 0) {
        const pet = petData[0];
        setNombre(pet.nombre);
        setDescripcion(pet.descripcion);
        setImagen('');
      }
    } catch (e) {
      console.error('Error al obtener la mascota:', e);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();

    const newPet = { nombre, descripcion, imagen };

    try {
      await Api.fetch('pet', {
        method: 'POST',
        body: JSON.stringify(newPet),
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Mascota creada exitosamente');
      navigate('/petlist');
    } catch (e) {
      console.error('Error al crear la mascota:', e);
      setError(e.message);
    }
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();

    const updatedPet = { nombre, descripcion, imagen };

    try {
      await Api.fetch(`pet/${uuid}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedPet),
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Mascota actualizada exitosamente');
      navigate('/petlist');
    } catch (e) {
      console.error('Error al actualizar la mascota:', e);
      setError(e.message);
    }
  };

  return (
    <div className="pet-form-container">
      <form className="pet-form" onSubmit={uuid ? handleUpdatePet : handleAddPet}>
        <label>
          Nombre:
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </label>
        <label>
          Descripción:
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            required 
          />
        </label>
        <label>
          Imagen (URL):
          <input 
            type="url" 
            value={imagen} 
            onChange={(e) => setImagen(e.target.value)} 
            autoComplete="off"
          />
        </label>
        <button type="submit">{tituloDelBoton}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
  
};

const PetForm = () => (
  <div>
    <Header />
    <PetFormBody />
  </div>
);

export default PetForm;
