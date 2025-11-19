import React from "react";
import '../paginas/css/General.css'
import Encabezado from "../componentes/Encabezado";
import Ultima_Actualizacion from "../componentes/Ultima Actualizacion";
import Tabla_Pacientes from "../componentes/Tabla_Pacientes";

const Inicio = () => {
    return(
        <div>
            <Encabezado/>
            <Ultima_Actualizacion/>
            <Tabla_Pacientes/>
        </div>
    )
}

export default Inicio