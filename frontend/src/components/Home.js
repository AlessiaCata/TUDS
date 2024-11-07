import { Swiper, SwiperSlide } from 'swiper/react';
import Header from './Header';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/Home.css';
import Footer from './Footer';
import publicidad1 from '../images/publicidad1.jpg';
import publicidad2 from '../images/publicidad2.jpg';
import publicidad3 from '../images/publicidad3.jpg';
import PUBLICIDAD from '../images/PUBLICIDAD.jpg';
import perfil1 from '../images/perfil.jpg'; 
import perfil2 from '../images/perfil2.jpg'; 
import perfil3 from '../images/perfil3.jpg';
import perfil4 from '../images/perfil4.jpg';
import perfil5 from '../images/perfil5.jpg';
import perfil6 from '../images/perfil6.jpg';
import perfil7 from '../images/perfil7.jpg'; 
import perfil8 from '../images/perfil8.jpg';
import perfil9 from '../images/perfil9.jpg'; 
import ffotito from '../images/ffotito.jpg'; 
import { Navigation } from 'swiper/modules';

const HomeBody = () => {
  const mascotas = [
    { id: 1, nombre: 'Firulais', descripcion: 'Amigable y juguetón: Es adorable y es gratificante ver su crecimiento hasta la edad adulta pero demanda tiempo y esfuerzo. Requiere alimentación frecuente, hace sus necesidades muchas veces por día, rompe objetos y acostumbra a llorar en las noches si se queda solo. La paciencia y la educación son esenciales durante su primer año y no se puede garantizar su tamaño final.', imagen: perfil3 },
    { id: 2, nombre: 'Luna', descripcion: 'Dócil y cariñosa: Es juguetón pero más adulto. Son más hábiles para aprender y adaptarse. Come dos veces al día. Ya tiene el tamaño definitivo, no cambiará de aspecto, ya tiene rasgos de personalidad desarrollados y estará esterilizado.', imagen: perfil4 },
    { id: 3, nombre: 'Max', descripcion: 'Protector y activo: No genera problemas por quedarse solo durante períodos razonables de tiempo y son grandes compañeros. Se adaptan fácilmente a un nuevo entorno familiar.', imagen: perfil5 },
    { id: 4, nombre: 'Pippa', descripcion: 'Protectora y Leal: Nos brinda la ventaja de disponer de mucho tiempo para nosotros. Suelen ser tranquilos y sedentarios. Aunque el período de compañía compartida posiblemente sea más breve, puedes ofrecerles durante los años que les quedan una vida digna y agradable. Estos abuelos, que esperaron durante mucho tiempo un hogar, muestran una gratitud sincera y son pura entrega.', imagen: perfil1 },
    { id: 5, nombre: 'Apolo', descripcion: 'Apegado y valiente: Pequeño, enérgico y muy cariñoso, Apolo es un Yorkshire Terrier que conquista corazones. Con su pelaje sedoso y ojos brillantes, siempre está listo para jugar o acurrucarse. Es valiente y protector a pesar de su tamaño, ideal para quienes buscan un amigo leal y lleno de vida.', imagen: perfil2 },
    { id: 6, nombre: 'Vitto', descripcion: 'Activo e inteligente: Vitto es un Border Collie lleno de inteligencia, energía y lealtad. Con su mirada intensa y su agilidad impresionante, es un compañero ideal para actividades al aire libre y deportes caninos. Siempre atento a las instrucciones, este perro es una mezcla perfecta de amor y dedicación. Además, su carácter afectuoso lo convierte en un gran amigo para toda la familia, siempre dispuesto a dar cariño y disfrutar de la compañía.', imagen: perfil6 },
    { id: 7, nombre: 'Michi', descripcion: 'Independiente y amoroso: Michi es un gatito que disfruta de su espacio pero siempre está listo para recibir cariño cuando lo desea. Es ideal para quienes buscan un amigo tranquilo y cariñoso.', imagen: perfil7 },
    { id: 8, nombre: 'Ramón', descripcion: 'Agresivo y miedoso: Ramón es un gato con una personalidad única, que a veces puede ser un poco temperamental. Aunque le cuesta confiar en los demás y puede reaccionar con agresividad, con paciencia y cuidado, puede convertirse en un amigo fiel. Ideal para personas con experiencia en gatos y que comprendan la importancia de darle su espacio.', imagen: perfil8 },
    { id: 9, nombre: 'Laura', descripcion: 'Mimosa y apegada: Laura es una gata que adora la compañía y los momentos de cariño. Siempre busca estar cerca y disfrutar de mimos y caricias. Es perfecta para alguien que desee una mascota que les haga sentir acompañados y les llene de amor incondicional.', imagen: perfil9 }
  ];

  return (
    <div className="home-body">
      {/* Sección de Publicidad */}
      <div className="publicidad">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide><img src={publicidad1} alt="Publicidad 1" className="publicidad-image" /></SwiperSlide>
          <SwiperSlide><img src={PUBLICIDAD} alt="Publicidad 2" className="publicidad-image" /></SwiperSlide>
          <SwiperSlide><img src={publicidad3} alt="Publicidad 3" className="publicidad-image" /></SwiperSlide>
        </Swiper>
      </div>

      {/* Texto debajo de la publicidad */}
      <div className="adoptar-con-conciencia">
        <h2>Antes de Adoptar</h2>
        <p><strong>Adoptá con conciencia y corazón.</strong></p>
        <p>
          Al pensar en adoptar, es crucial tener en cuenta diversos factores para garantizar una convivencia armoniosa. Evalúa el espacio disponible en tu hogar, el tiempo que puedes dedicar al juego y paseo, así como los costos asociados con la alimentación, atención veterinaria y cuidado durante las vacaciones. Asegúrate de que tu elección de mascota se ajuste a tu estilo de vida y a la cantidad de tiempo que puedes comprometer.
        </p>
        <p>
          Es importante recordar que un animal de compañía puede tener una vida promedio de entre 14 y 18 años, y durante todo ese tiempo dependerá de vos. Adoptar implica asumir la responsabilidad de su bienestar y felicidad a lo largo de su vida.
        </p>
      </div>

      {/* Nueva Sección Carousel para Mascotas */}
      <section className="dynamic-carousel-perros">
        <h2>Conoce a Más Mascotas</h2>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {mascotas.map(mascota => (
            <SwiperSlide key={mascota.id} className="carousel-item">
              <img
                src={mascota.imagen}
                alt={mascota.nombre}
                className="carousel-image"
              />
              <h3>{mascota.nombre}</h3>
              <p>{mascota.descripcion}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="contenedor-principal">
        <div className="lado-izquierdo">
          <h2 className="elementor-heading-title elementor-size-default">Requisitos de adopción</h2>
          <ul className="requisitos-lista">
            <li><i className="fas fa-paw"></i> Los animales serán entregados tras una entrevista telefónica con nuestro equipo de adopción.</li>
            <li><i className="fas fa-paw"></i> Los adoptantes deberán suscribir un contrato de adopción, comprometiéndose a garantizar una tenencia responsable a lo largo de la vida del animal.</li>
            <li><i className="fas fa-paw"></i> Los animales mayores de 6 meses se entregarán castrados. En el caso de adoptar un cachorro más joven, el adoptante se compromete a castrarlo entre los 6 meses y el primer año de edad, de manera obligatoria.</li>
            <li><i className="fas fa-paw"></i> Las adopciones están restringidas a la zona de Capital Federal y Gran Buenos Aires, Argentina, sujeto a consideración.</li>
            <li><i className="fas fa-paw"></i>Nos reservamos el derecho de aprobar o rechazar una postulación según los criterios y valores de nuestra organización.</li>
            <li><i className="fas fa-paw"></i> Los datos proporcionados por el postulante son confidenciales y se utilizan exclusivamente para el proceso de adopción, sin transferirse a terceros en ningún caso.</li>
            <li> Si ya lo decidiste, y te sentís capacitado, es momento de comenzar con la postulación para elegir a tu nuevo compañero de vida.</li>
          </ul>
        </div>
        <div className="lado-derecho">
          <img src={ffotito} alt="Imagen" className="imagen-adopcion" />
        </div>
      </div>
    </div>
  );
};

const Home = () => (
  <div>
    <Header />
    <HomeBody />
    <Footer/>
  </div>
);

export default Home;





