const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')


// ------------------- Middleware -------------------
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()); 


// ------------------- Conexion Base de Datos -------------------
const db = {
    host: 'mysql-base1cine.alwaysdata.net',
    user: 'base1cine_admin',
    password: 'contrasena_1234',
    database: 'base1cine_keralty'
}



// ------------------- Rutas -------------------
app.get('/', (req, res) => {
    res.send('Hola desde el backend')
})


//Obtener ultima actualizacion
app.get('/obtener_utlima_actualizacion', async (req, res) => {
    let conect;
    try {
        conect = await mysql.createConnection(db);

        const [ultima_actualizacion] = await conect.execute(`
            SELECT * FROM ultima_actualizacion
        `);

        res.status(200).json({
            success: true,
            data: ultima_actualizacion
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'No se pudo obtener la ultima actualizacion'
        });
    } finally {
        if (conect) await conect.end();
    }
})


//Listar tipos de informacion
app.get('/listar_tipos_informacion', async (req, res) => {
    let conect;
    try {
        conect = await mysql.createConnection(db);

        const [buscar_tipos] = await conect.execute(`
            SELECT * FROM tipo_informacion
        `);

        res.status(200).json({
            success: true,
            data: buscar_tipos
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'No se pudo listar los tipos de informacion'
        });
    } finally {
        if (conect) await conect.end();
    }
})


//Listar pacientes
app.get('/listar_pacientes', async (req, res) => {
    let conect;
    try {
        conect = await mysql.createConnection(db);

        const [buscar_pacientes] = await conect.execute(`
            SELECT 
                p.id_paciente,
                p.nombre,
                p.cama,
                t.id_tipo_informacion,
                t.tipo_informacion,
                COALESCE(pi.estado, 0) AS estado,
                pi.fecha,
                pi.hora
            FROM paciente p
            CROSS JOIN tipo_informacion t
            LEFT JOIN paciente_informacion pi
                ON pi.paciente_id = p.id_paciente 
                AND pi.tipo_informacion_id = t.id_tipo_informacion
            ORDER BY p.nombre ASC, t.id_tipo_informacion ASC;
        `);

        res.status(200).json({
            success: true,
            data: buscar_pacientes
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'No se pudo listar los datos'
        });
    } finally {
        if (conect) await conect.end();
    }
});


//Seleccionar dato si ya existe en la base de datos
app.post('/seleccionar', async(req, res) => {
    let conect
    try{
        conect = await mysql.createConnection(db)

        const {id_paciente, id_tipo_informacion} = req.body
        const estado = 1
        const fecha = new Date()
        const hora = fecha.toLocaleTimeString('es-CO', { hour12: false });

        const [buscar_dato_paciente] = await conect.execute(
            'SELECT * FROM paciente_informacion WHERE paciente_id = ? AND tipo_informacion_id = ?',[id_paciente, id_tipo_informacion])

        if(buscar_dato_paciente.length === 0){
            await conect.execute('INSERT INTO paciente_informacion (paciente_id, tipo_informacion_id, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)', [id_paciente, id_tipo_informacion, fecha, hora, estado])
        }

        await conect.execute('UPDATE paciente_informacion SET estado = ?, fecha = ?, hora = ? WHERE paciente_id = ? AND tipo_informacion_id = ?', [estado, fecha, hora, id_paciente, id_tipo_informacion])

        await conect.execute('UPDATE ultima_actualizacion SET fecha = ?, hora = ? WHERE id_ultima_actualizacion = 1', [fecha, hora])

        res.status(200).json({
            success: true,
            message: 'Dato seleccionado'
        })

    }
    catch(error){
        console.error('Error: ' + error)
        res.status(500).json({
            success: false,
            message: 'No se pudo actualizar el estado'
        })
    }
    finally{
        if (conect) await conect.end()
    }
})



//deseleccionar dato
app.post('/deseleccionar', async(req, res) => {
    let conect
    try{
        conect = await mysql.createConnection(db)

        const {id_paciente, id_tipo_informacion} = req.body
        const estado = 0
        const fecha = null
        const hora = null

        const fecha_2 = new Date();
        const hora_2 = fecha_2.toLocaleTimeString('es-CO', { hour12: false });

        const [buscar_dato_paciente] = await conect.execute(
            'SELECT * FROM paciente_informacion WHERE paciente_id = ? AND tipo_informacion_id = ?',[id_paciente, id_tipo_informacion])

        if(buscar_dato_paciente.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No se encontro el dato seleccionado'
            })
        }

        await conect.execute('UPDATE paciente_informacion SET estado = ?, fecha = ?, hora = ? WHERE paciente_id = ? AND tipo_informacion_id = ?', [estado, fecha, hora, id_paciente, id_tipo_informacion])

        await conect.execute('UPDATE ultima_actualizacion SET fecha = ?, hora = ? WHERE id_ultima_actualizacion = 1', [fecha_2, hora_2])

        res.status(200).json({
            success: true,
            message: 'Dato deseleccionado'
        })

    }
    catch(error){
        console.error('Error: ' + error)
        res.status(500).json({
            success: false,
            message: 'No se pudo actualizar el estado'
        })
    }
    finally{
        if (conect) await conect.end()
    }
})



// ------------------- Escucha del puerto -------------------
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto http://localhost:3001');
});