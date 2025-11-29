import React, { useEffect, useState } from "react";
import '../paginas/css/General.css'
import Encabezado from "../componentes/Encabezado";
import Ultima_Actualizacion from "../componentes/Ultima_Actualizacion";
import Tabla_Pacientes from "../componentes/Tabla_Pacientes";
import { useNavigate } from "react-router-dom";

const Inicio = () => {

    // ---------------- Obtener la ultima actualizacion ----------------
    const [actualizacion, setActualizacion] = useState({})

    useEffect(() => {
        const Obtener_Ultima_Actualizacion = async () => {
            const res = await fetch('http://localhost:3001/obtener_utlima_actualizacion')
            const datos = await res.json()
            
            setActualizacion(datos.data[0])
        }

        Obtener_Ultima_Actualizacion()
    }, [])



    const navigate = useNavigate()

    const [datos_pacientes, setDatos_pacientes] = useState([]);
    const [columnas, setColumnas] = useState([]);

    // ---------------- Obtener los tipos de informacion ----------------
    const Obtener_Tipos = async () => {
        try{
            const res = await fetch("http://localhost:3001/listar_tipos_informacion");
            const datos = await res.json();
            if (datos.success) {
                setColumnas(datos.data)
            }
        }
        catch (error) {
            console.error("Error al obtener tipos: ", error);
        }
    };

    // ---------------- Obtener Datos de los pacientes ----------------
    const Obtener_Pacientes = async () => {
        try{
            const res = await fetch("http://localhost:3001/listar_pacientes");
            const datos = await res.json();

            // Agrupación por paciente
            const map = {};
            datos.data.forEach((item) => {
                if (!map[item.id_paciente]) {
                map[item.id_paciente] = {
                    id_paciente: item.id_paciente,
                    nombre: item.nombre,
                    cama: item.cama,
                    tipos: {},
                };
                }

                map[item.id_paciente].tipos[item.id_tipo_informacion] = {
                estado: item.estado,
                fecha: item.fecha ? item.fecha.split("T")[0] : "",
                hora: item.hora || "",
                };
            });

            setDatos_pacientes(Object.values(map));
            console.log(Object.values(map))
        } 
        catch (error) {
            console.error("Error: " + error);
        }
    };


    // ---------------- Renderizado de todos los datos apenas cargue la pagina ----------------
    useEffect(() => {
        Obtener_Tipos();
        Obtener_Pacientes();
    }, []);


    // ---------------- Seleccionar o Deseleccionar tipo de informacion por medio de un checkbox ----------------
    const handleChange = async (id_paciente, tipo, checked) => {
        const id_tipo = tipo.id_tipo_informacion;
        const url = checked
        ? "http://localhost:3001/seleccionar"
        : "http://localhost:3001/deseleccionar";

        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                id_paciente,
                id_tipo_informacion: id_tipo,
                }),
        });

            Obtener_Pacientes();
            navigate(0)
        } 
        catch (error) {
            console.error("Error: ", error);
        }
    };

    return(
        <div>
            <Encabezado/>
            <Ultima_Actualizacion
                actualizacion={actualizacion}
            />
            <Tabla_Pacientes
                columnas={columnas}
                datos_pacientes={datos_pacientes}
                handleChange={handleChange}
            />
        </div>
    )
}

export default Inicio