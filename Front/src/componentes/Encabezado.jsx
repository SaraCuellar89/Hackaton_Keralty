import React from "react";
import '../componentes/css/Encabezado.css'
import logo from '../img/logo.png'
import logo_agente from '../img/logo_agente.png'

const Encabezado = () => {
    return(
        <div className="contenedor_encabezado">
            <img src={logo} alt="" />
            <p>Centro Integrado de Eficiencia para la Alta del Paciente Cardiovascular</p>
            <img src={logo_agente} alt="" />
        </div>
    )
}

export default Encabezado