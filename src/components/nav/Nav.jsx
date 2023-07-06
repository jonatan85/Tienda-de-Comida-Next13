
import ActiveLink from "../activeLink/ActiveLink";
import styles from './nav.module.css'
import Carrito from "@/app/carrito/page";

export default function Nav() {
  return (
   <>
        <nav className={styles.nav}>
            <ActiveLink text='Home' href='/'/>
            <ActiveLink text='Platos' href='/platos'/>
            <ActiveLink text='Ingredientes' href='/ingredientes'/>
            <ActiveLink text='Añade tus platos' href='/crud'/>
            <ActiveLink text='Añade Ingredientes' href='/crudIngredientes'/>
            <ActiveLink text='Nosotros' href='/nosotros'/>
        </nav>
   </>
  )
}
