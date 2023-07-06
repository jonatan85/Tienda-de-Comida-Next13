'use client'

import Image from "next/image"

const cargador=({src, width})=>{
    return `${src}?w=${width}`
}

export default function Imagen({valor}) {
  return (
    <>
        <Image
            loader={cargador}
            width={150}
            height={200}
            src={valor.picture}
            alt={valor.name}
        />
    </>
  )
}
