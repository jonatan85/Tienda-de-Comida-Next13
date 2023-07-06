import Nav from '@/components/nav/Nav'
import Providers from '@/store/provider'
import Carrito from './carrito/page'

import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './footer/page'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tienda de Comida Next13',
  description: 'Tienda de comida donde podras ver recetas y comprar platos con next 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Nav/>
          <div className='containerCarrito'>
            <Carrito />
          </div>
          <div className='container'>
            {children}
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  )
}
