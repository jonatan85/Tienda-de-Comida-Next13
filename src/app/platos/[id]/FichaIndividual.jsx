'use client'

import Imagen from "@/components/imagen/Imagen"
import Ingredients from "@/components/ingredients/Ingredients"
import { comprar } from "@/store/slice"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useState } from "react"


import styles from './id.module.css';
import EditarPlatos from "@/components/editarPlates/EditarPlatos"

export default function FichaIndividual({datos, handleModificar}) {
  const [deleteError, setDeleteError] = useState(false);

  const dispatch =  useDispatch()
  const adquirir =  (datos) => {
    dispatch(comprar(
        {
            plates:datos.id,
            name: datos.name,
            cantidad: datos.account,
            precio:datos.price,
            imagen:datos.picture
        }
    ))
  }

  const handleDelete = (id) => {
    fetch(`https://platos-como-te-gustan-node.vercel.app/plates/${id}`, {
    method: 'DELETE',
    })
      .then((response) => {
        if(response.ok) {
          console.log('Datos eliminados correctamente');
          window.history.back();
        } else {
          setDeleteError(true);
          console.error('Error al eliminar los datos. Codigo de respuesta:', response.status);
        }
    })
    .catch((error) => {
      setDeleteError(true);
      console.error('Error al realizar la solicitud de eliminación', error);
    })
  }  

    return (
      <>
      <div className={styles.contenedor}>
          <div className={styles.imagen}>
            <Imagen valor={datos} />
          </div>
          <div className={styles.contnedorNombrePrecio}>
            <div className={styles.nombre}>{datos.name}</div>
            <div className={styles.contenedorPrecioTipo}>
              <div className={styles.tipo}>Tipo de plato: {datos.type}</div>
              <div className={styles.precio}>Precio: {datos.price}</div>
            </div>
          </div>
          <div className={styles.contenedorDescripcionIngredientes}>
            <div className={styles.descripcionContainer}>
              <div className={styles.descripcion}>Descripción: {datos.description}</div>
            </div>
            <div className={styles.ingredientes}>
                <p className={styles.ingredietesTitulo}>Ingredientes:</p>
                <div>
                  <Ingredients valor={datos.ingredients} />
                </div>
            </div>
          </div>
          <div className={styles.botones}>
            <button className={styles.botonComprar} onClick={() => adquirir(datos)}>
              Comprar
            </button>
            <Link href="/platos" className={styles.botonComprar}>
              Volver
            </Link>
            <button className={styles.botonComprar} onClick={() => handleDelete(datos._id)}>
              Eliminar
            </button>
            <button className={styles.botonComprar}>
                Editar
                <div className={styles.botonEditar}>
                  <EditarPlatos datos={datos} />
                </div>
            </button>
          </div>
          </div>
    </>
    
  )
}
