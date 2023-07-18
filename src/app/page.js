import Carrusel from './carrusel/page';
import styles from './stylesHome.module.css';
import Image from 'next/image';
import ImagenRicota from '../public/img/ricota.jpg';

export default function Home () {
  
    return (
      <>
      <Carrusel />
      <div className={styles.contenedorHome}>
        <div className={styles.imagenContainer}>
          <Image src={ImagenRicota} alt='imagen ricota' className={styles.imagen} />
        </div>
        <div className={styles.parrafoContainer}>
          <p className={styles.parrafoTexto}>
            "Bienvenidos a mi apetitoso blog de comida. Aquí podrás dar rienda suelta a tu creatividad culinaria, creando platos únicos y experimentando con una amplia variedad de ingredientes. Nuestro sitio web te brinda la libertad de crear tus propios platos y agregarles ingredientes personalizados, junto con descripciones detalladas e imágenes irresistibles. Ya sea que estés buscando inspiración para una cena especial o quieras explorar combinaciones de sabores innovadoras, ¡nuestro blog de comida es el lugar perfecto para dejar volar tu imaginación en la cocina! Únete a nuestra comunidad gastronómica y comparte tus creaciones culinarias con otros apasionados como tú. ¡Buen provecho!"
          </p>
        </div>
      </div>
    </>
    );
}
