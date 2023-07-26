import Link from "next/link"

import styles from './editarIngrediente.module.css';

export default function EditarIngredientes({valor}) {
  const {_id} = valor
  
    return (
    <>  
      <Link className={styles.boton} href={`/crudIngredientes/${_id}`}>
        Editar
      </Link>
    </>
  )
}
