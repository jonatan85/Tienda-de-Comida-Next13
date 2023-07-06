import Put from './Put.jsx';

const cargarDatos=(id)=>{
    return fetch(`https://platos-como-te-gustan-node.vercel.app/ingredients/${id}`)
    .then(res => res.json())
  }

export default async function page({params}) {
    const {id} = params;
  
    const datos = await cargarDatos(id);
  return (
    <>
        <Put datos={datos}/>
    </>
  )
}
