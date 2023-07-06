'use client'
import { useState } from "react";
import Link from "next/link";

import styles from './idIngredients.module.css';
import EditarIngredientes from "@/components/editarIngredientes/EditarIngredientes";

export default function FichaIndividualIngredientes({datos}) {
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = (id) => {
    fetch(`https://platos-como-te-gustan-node.vercel.app/ingredients/${id}`,{
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
            console.error('Error al realizar la solicitud de eliminación', error)
        })
  }


    return (
    <>
        <div className={styles.contenedor}>
            <div className={styles.detalles}>
                <div className={styles.imagen}>
                    <img src={datos.picture} alt={datos.name}/>
                </div>
                <div className={styles.nombre}>Nombre de el Ingrediente: {datos.name} </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.description}>Descripción: {datos.description}</div>
                </div>
            </div>
            <div className={styles.botones}>
                <Link href="/ingredientes" className={styles.botonVolver}>
                    Volver
                </Link>
                <button className={styles.botonVolver} onClick={() => handleDelete(datos._id)}>
                Eliminar
                </button>
                <button className={styles.boton}>
                    <EditarIngredientes valor={datos} />
                </button>
            </div>
        </div>
    </>
  )
}
