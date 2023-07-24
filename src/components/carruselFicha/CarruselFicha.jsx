import Link from "next/link"

import Image from '../imagen/Imagen.jsx';

export default function CarruselFicha({valor}) {
  const {_id} = valor
  
  return (
    <>
      <div>
        <div className="nombre">
            {valor.name}
        </div>
        <div className="ver">
            <Link href={`/platos/${_id}`}><button>Ver</button></Link>
        </div>
      </div>
    </>
  )

}