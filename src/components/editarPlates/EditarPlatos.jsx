import Link from "next/link";

import styles from './editarPlatos.module.css';


export default function EditarPlatos({datos}) {
    const {_id} = datos

  return (
    <>
        <Link className={styles.boton} href={`/crud/${_id}`}>
            Editar
        </Link>
    </>
  )
}
