import Link from "next/link"

import Image from '../imagen/Imagen.jsx';

import styles from './ficha.module.css';

export default function Ficha({valor}) {
  const {_id} = valor
  
  return (
    <>
    <div className={styles.cardOrigen}>
      <Link href={`/platos/${_id}`}>
        <div className={styles.card}>
          <div className={styles.imagen}>
              <Image valor={valor} /> 
          </div>
        </div>
        <div className={styles.nombre}>
          <h3>
            {valor.name}
          </h3>
        </div>
      </Link>
    </div>
    </>
  )

}
