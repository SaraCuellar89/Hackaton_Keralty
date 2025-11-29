# El CARE - Centro Integrado de Eficiencia para la Alta del Paciente Cardiovascular

---

## Tecnologías Utilizadas para el DashBoard
- **React.js**  
- **CSS3**  
- **JavaScript**  
- **Node.js & Express**  
- **MySQL**

- ## Ejecutarlo
  - Descargar el Proyecto.  
  ```
  git clone https://github.com/SaraCuellar89/Hackaton_Keralty.git
  ```
  - **Ejecutar el Frontend**  
    - Abrir una terminal dentro de la carpeta DashBoard/Front.  
    ```javascript
    //Intalar dependecias:
    npm install
    ```
    ```javascript
    //Ejecutar:
    npm run dev
    ```
  - **Ejecutar el Backend**  
    - Abrir una terminal dentro de la carpeta DashBoard/Back. 
    ```javascript
    //Intalar dependecias:
    npm install
    ```
    ```javascript
    //Ejecutar:
    npm run app
    ```
  - En el nevagador ir a http://localhost:5173
- ## ¿Que hace?
  - Lista los pacientes
  - Permite finalizar procesos por medio de checkboxes
  - Registra automáticamente fecha y hora de cada acción

---

## Tecnologías Utilizadas para el Agente
- **n8n Cloud** (El código no funciona en n8n local)
- **Integración con Telegram**
- ## Ejecutarlo
  - Copiar el contenido del archivo `Codigo_Agente.txt`
  - Abrir n8n Cloud
  - Crear un workflow
  - Pegar el codigo
  - Guardar y activar
- ## ¿Que hace?
  - Primer flujo: envía un mensaje automático al médico a través de Telegram.
  - Segundo flujo: espera la respuesta del médico y procesa la confirmación.
