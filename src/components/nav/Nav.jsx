'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import ActiveLink from '../activeLink/ActiveLink';
import styles from './nav.module.css';
import image from '../../public/img/home.png';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div>
        <nav className={styles.nav}>
          <div className={styles.iconContainer}>
            <a href="/">
              <Image className={styles.icon} src={image} alt="home" />
            </a>
          </div>
            <div className={styles.menuIcon} onClick={toggleMenu}>
              <FaBars />
            </div>
          <div className={`${styles.linksContainer} ${isMenuOpen ? styles.open : ''}`}>
            <ActiveLink text="Home" href="/" />
            <ActiveLink text="Platos" href="/platos" />
            <ActiveLink text="Ingredientes" href="/ingredientes" />
            <ActiveLink text="Añade tus platos" href="/crud" />
            <ActiveLink text="Añade Ingredientes" href="/crudIngredientes" />
          </div>
        </nav>
      </div>
    </>
  );
}


