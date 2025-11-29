import React from "react";
import '../componentes/css/Barra_Busqueda.css'

const Ultima_Actualizacion = ({actualizacion}) => {
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