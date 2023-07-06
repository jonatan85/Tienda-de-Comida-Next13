


const cargarDatos = () => {
  return fetch('https://platos-como-te-gustan-node.vercel.app/plates', { cache: 'no-store' })
    .then(res => res.json());
};
export default function Home () {
  
    return (
      <></>
    );
}
