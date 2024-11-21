let express = require('express');
let path = require('path');

let app = express();

// indicamos que vamos a hacer uso de plantillas y el motor con el que trabajaremos para ello
app.set("view engine", "ejs");
//indico ubicación de las plantillas
app.set("views", path.join(__dirname, 'views'));

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));

// ponemos el servicio en escucha
app.listen(5000, () =>
{
    console.log ( "Servicio en marcha desde el puerto 5000");

})

const recetasApp = [
    {titulo:"Pizza margarita",ingredientes:["harina","tomate","queso"]},
    {titulo:"Paella",ingredientes:["arroz","marisco","azafran"]}];


// Ruta principal para mostrar las recetas
// atendiendo petición GET, y llamando a index con asignación de valores a los parametros
app.get("/", function(req, res)
{
    res.render('index', {'recetas':recetasApp});
})

app.get("/index-for", function(req, res)
{
    res.render('index-for', {'recetas':recetasApp});
})

// Ruta para mostrar el formulario
app.get("/nueva-receta", (req, res) => {
    res.render("nueva-receta");
});

// Ruta para manejar el formulario (POST)
app.post("/nueva-receta", (req, res) => {
    const { titulo, ingredientes} = req.body;

    // Validar los datos (simplificado)
    if (!titulo || !ingredientes) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Añadir la nueva receta al array
    recetasApp.push({
        titulo,
        ingredientes: ingredientes.split(",").map(i => i.trim()), // Separar ingredientes por coma
    });

    // Redirigir a la página principal
    res.redirect("/");
});

