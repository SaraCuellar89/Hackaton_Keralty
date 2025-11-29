import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../componentes/css/Tabla_Pacientes.css";

const Tabla_Pacientes = ({columnas, datos_pacientes, handleChange}) => {
  return (
    <div className="contenedor_tabla_pacientes">
      <table>
        <thead>
          <tr>
            <th>Cama</th>
            <th>Paciente</th>
            {columnas.map((col) => (
              <th key={col.id_tipo_informacion}>{col.tipo_informacion}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {datos_pacientes.map((p) => (
            <tr key={p.id_paciente}>
              <td>{p.cama}</td>
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
