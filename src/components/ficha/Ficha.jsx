import Link from "next/link"

import Image from '../imagen/Imagen.jsx';

import styles from './ficha.module.css';

export default function Ficha({valor}) {
  const {_id} = valor
  
  return (
    <>
      <div>
        <div className={styles.nombre}>
            {valor.name}
        </div>
        <div className={styles.imagen}>
            <Image valor={valor} /> 
        </div>
        <div className={styles.ver}>
            <Link href={`/platos/${_id}`}><button>Ver</button></Link>
        </div>
      </div>
    </>
  )

}
