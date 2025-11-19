import React from "react";
import '../componentes/css/Barra_Busqueda.css'
import { useEffect } from "react";
import { useState } from "react";

const Ultima_Actualizacion = () => {

    const [actualizacion, setActualizacion] = useState({})

    useEffect(() => {
        const Obtener_Ultima_Actualizacion = async () => {
            const res = await fetch('http://localhost:3001/obtener_utlima_actualizacion')
            const datos = await res.json()

            console.log(datos.data[0])
            setActualizacion(datos.data[0])
        }

        Obtener_Ultima_Actualizacion()
    }, [])

    return(
        <div className="contenedor_barra_busqueda">
            <input
                type="search"
                disabled
                value={`Ultima Actualizacion: ${
                    actualizacion.fecha
                    ? new Date(actualizacion.fecha).toLocaleDateString('es-CO')
                    : ''
                } - ${actualizacion.hora || ''}`}
            />
        </div>
    )
}

export default Ultima_Actualizacion