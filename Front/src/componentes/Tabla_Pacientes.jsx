import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../componentes/css/Tabla_Pacientes.css";

const Tabla_Pacientes = () => {

  const navigate = useNavigate()

  const [datos_pacientes, setDatos_pacientes] = useState([]);
  const [columnas, setColumnas] = useState([]); // aquí guardaremos los tipos desde el backend

  //-------------------------------
  //  OBTENER TIPOS DE INFORMACION
  //-------------------------------
  const Obtener_Tipos = async () => {
    try {
      const res = await fetch("http://localhost:3001/listar_tipos_informacion");
      const datos = await res.json();
      if (datos.success) {
        setColumnas(datos.data); // guardamos todo el objeto tipo {id_tipo_informacion, tipo_informacion}
      }
    } catch (error) {
      console.error("Error al obtener tipos: ", error);
    }
  };

  //-------------------------------
  //  OBTENER PACIENTES DEL BACKEND
  //-------------------------------
  const Obtener_Pacientes = async () => {
    try {
      const res = await fetch("http://localhost:3001/listar_pacientes");
      const datos = await res.json();

      // Agrupación por paciente
      const map = {};
      datos.data.forEach((item) => {
        if (!map[item.id_paciente]) {
          map[item.id_paciente] = {
            id_paciente: item.id_paciente,
            nombre: item.nombre,
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
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  useEffect(() => {
    Obtener_Tipos();
    Obtener_Pacientes();
  }, []);

  //----------------------------------
  //  HANDLE CAMBIO DE CHECKBOX
  //----------------------------------
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

      // volver a cargar los datos
      Obtener_Pacientes();
      navigate(0)
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="contenedor_tabla_pacientes">
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            {columnas.map((col) => (
              <th key={col.id_tipo_informacion}>{col.tipo_informacion}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {datos_pacientes.map((p) => (
            <tr key={p.id_paciente}>
              <td>{p.nombre}</td>

              {columnas.map((col) => (
                <td key={col.id_tipo_informacion}>
                  <div>
                    <input
                      type="checkbox"
                      checked={Boolean(p.tipos[col.id_tipo_informacion]?.estado)}
                      onChange={(e) =>
                        handleChange(p.id_paciente, col, e.target.checked)
                      }
                    />
                    {p.tipos[col.id_tipo_informacion]?.estado === 1 && (
                      <>
                        <p>{p.tipos[col.id_tipo_informacion].fecha}</p>
                        <p>{p.tipos[col.id_tipo_informacion].hora}</p>
                      </>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla_Pacientes;
