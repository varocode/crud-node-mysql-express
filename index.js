// Importa Express, un framework web para Node.js
const express = require("express");

// Crea una instancia de la aplicación Express
const app = express();

// Importa el módulo de MySQL para Node.js
const mysql = require("mysql");

// Importa CORS, un middleware para habilitar el intercambio de recursos entre diferentes orígenes
const cors = require("cors");

// Utiliza el middleware CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configura Express para que pueda analizar JSON en las solicitudes HTTP
app.use(express.json());

// Crea una conexión con la base de datos MySQL
const bd = mysql.createConnection({
  host: "localhost", // Especifica el host de la base de datos (en este caso, local)
  user: "root", // Especifica el usuario de la base de datos
  password: "", // Especifica la contraseña de la base de datos
  database: "empleados_crud", // Especifica el nombre de la base de datos
});

// Define una ruta POST para crear un nuevo empleado
app.post("/create", (req, res) => {
  const nombre = req.body.nombre; // Obtiene el nombre del empleado del cuerpo de la solicitud
  const edad = req.body.edad; // Obtiene la edad del empleado del cuerpo de la solicitud
  const pais = req.body.pais; // Obtiene el país del empleado del cuerpo de la solicitud
  const cargo = req.body.cargo; // Obtiene el cargo del empleado del cuerpo de la solicitud
  const anios = req.body.anios; // Obtiene los años de experiencia del empleado del cuerpo de la solicitud

  // Ejecuta una consulta SQL para insertar los datos del empleado en la base de datos
  bd.query(
    "INSERT INTO empleados (nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err); // Si hay un error, imprímelo en la consola
      } else {
        res.send(result); // Si la consulta se ejecuta con éxito, envía una respuesta al cliente
      }
    }
  );
});

// Define una ruta GET para recuperar todos los empleados de la base de datos
app.get("/empleados", (req, res) => {
  // Ejecuta una consulta SQL para recuperar todos los empleados de la base de datos
  bd.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err); // Si hay un error, imprímelo en la consola
    } else {
      res.send(result); // Si la consulta se ejecuta con éxito, envía la respuesta al cliente
    }
  });
});

// Define una ruta PUT para actualizar los datos de un empleado existente
app.put("/update", (req, res) => {
  const id = req.body.id; // Obtiene el ID del empleado del cuerpo de la solicitud
  const nombre = req.body.nombre; // Obtiene el nuevo nombre del empleado
  const edad = req.body.edad; // Obtiene la nueva edad del empleado
  const pais = req.body.pais; // Obtiene el nuevo país del empleado
  const cargo = req.body.cargo; // Obtiene el nuevo cargo del empleado
  const anios = req.body.anios; // Obtiene los nuevos años de experiencia del empleado

  // Ejecuta una consulta SQL para actualizar los datos del empleado en la base de datos
  bd.query(
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?",
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Define una ruta DELETE para eliminar un empleado por su ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id; // Obtiene el ID del empleado de los parámetros de la ruta

  // Ejecuta una consulta SQL para eliminar el empleado de la base de datos
  bd.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Configura el servidor para que escuche en el puerto 3001
app.listen(3001, () => {
  console.log("server is running on port 3001"); // Imprime un mensaje en la consola cuando el servidor se inicia correctamente
});
