'use client'

import "./globals.css";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Menu } from "@/components/menu";
import FechaSelector from "@/components/fechaSelector";
import Label from "@/components/label";
import { GanttTable } from "@/components/ganttTable";


//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateInfo } from "@/funciones/redux/actions";


export function ApuMicro(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anoEnUso, setAnoEnUso] = useState('2024');                                   //comodin
    //const [tasks, setTasks] = useState({'cooooo':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 'azzul':{'diasDuracion':2, 'accionAnteriorObligatoria': 'cooooo'}, 'davis': {'diasDuracion':4, 'accionAnteriorObligatoria': 'azzul'},  'otro': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': '4'}});
    const [changeTask, setChangeTask] = useState({});


    const handleMenuActivation = (isOpen) => {
        setIsMenuOpen(isOpen)
        console.log(isOpen ? 'El menú se ha abierto.' : 'El menú se ha cerrado.');
    };

    //const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onlineHandler = () => setIsOnline(true);
    const offlineHandler = () => setIsOnline(false);

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);




    return (
        <html>
            <head>
                <link
                href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Dancing+Script&family=Montserrat+Alternates:ital,wght@0,300;1,100&family=PT+Serif:ital@1&family=Playfair+Display:ital,wght@1,500&family=Rubik+Vinyl&display=swap"
                rel="stylesheet"
                />
                <link 
                rel="icon" 
                href="https://res.cloudinary.com/dplncudbq/image/upload/v1692559936/mias/icon_efg3sf.png" 
                type="image/x-icon">
                </link>
            </head>
            <body className={`imagenFondo ${isMenuOpen === false ? 'marco' : 'sinMarco' }`} style={{height: '100%'}}>
                <div>
                    <div>
                            {/*<Menu onActivate={handleMenuActivation} />*/}
                            <GanttTable />
                    </div>
                </div>
            </body>
        </html>
    );
}