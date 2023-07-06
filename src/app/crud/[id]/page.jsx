import CrudPut from "./CrudPut.jsx";

const cargarDatos=(id)=>{
    return fetch(`https://platos-como-te-gustan-node.vercel.app/plates/${id}`)
    .then(res => res.json())
}

export default async function page({params}) {
    console.log(params);
    const {id} = params;

    const datos = await cargarDatos(id);
  return (
    <>
        <CrudPut datos={datos} />
    </>
  )
}
