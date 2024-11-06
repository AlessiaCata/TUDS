import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from './Header';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/Home.css';
import publicidad1 from '../images/publicidad1.jpg';
import publicidad2 from '../images/publicidad2.jpg';
import publicidad3 from '../images/publicidad3.jpg';
import perfil1 from '../images/perfil.jpg'; 
import perfil2 from '../images/perfil2.jpg'; 
import perfil3 from '../images/perfil3.jpg';
import perfil4 from '../images/perfil4.jpg';
import perfil5 from '../images/perfil5.jpg';
import { Navigation } from 'swiper/modules';

const HomeBody = () => {
  const perros = [
    { id: 1, nombre: 'Firulais', descripcion: 'Amigable y juguetón', imagen: perfil3 },
    { id: 2, nombre: 'Luna', descripcion: 'Dócil y cariñosa', imagen: perfil4 },
    { id: 3, nombre: 'Max', descripcion: 'Protector y activo', imagen: perfil5 },
    { id: 4, nombre: 'Pippa', descripcion: 'Protectora y Leal', imagen: perfil1 },
    { id: 5, nombre: 'Apolo', descripcion: 'Apegado y valiente', imagen: perfil2 },
  ];

  return (
    <div className="home-body">
      {/* Sección de Publicidad */}
      <div className="publicidad">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide><img src={publicidad1} alt="Publicidad 1" className="publicidad-image" /></SwiperSlide>
          <SwiperSlide><img src={publicidad2} alt="Publicidad 2" className="publicidad-image" /></SwiperSlide>
          <SwiperSlide><img src={publicidad3} alt="Publicidad 3" className="publicidad-image" /></SwiperSlide>
        </Swiper>
      </div>

      {/* Nueva Sección Carousel Normal Desktop */}
      <section className="dynamic-carousel-normal-desktop">
        <h2>Conoce a Más Perritos</h2>
        <div className="carousel-grid">
          {perros.map(perro => (
            <div key={perro.id} className="carousel-item">
              <img
                src={perro.imagen}
                alt={perro.nombre}
                className="carousel-image"
              />
              <h3>{perro.nombre}</h3>
              <p>{perro.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Perros en Adopción */}
      <div className="perros-adopcion">
        <h2>Perros en Adopción</h2>
        <div className="lista-perros">
          {perros.map(perro => (
            <div key={perro.id} className="perro-item">
              <img src={perro.imagen} alt={perro.nombre} className="foto-perro" />
              <h3>{perro.nombre}</h3>
              <p>{perro.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => (
  <div>
    <Header />
    <HomeBody />
  </div>
);

export default Home;



