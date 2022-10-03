const express = require('express');
const path = require('path');
require('dotenv').config();

/**
 * Midelwares
 */
const morgan = require('morgan');
const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

const { format } = require('timeago.js');


// Inicializaciones
const app = express();
require('./src/database.js');


// Configuracion
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'src/views')); //indica en que directorio esta src y entra en la carpeta view
app.set('view engine', 'ejs'); // MOTOR DE PLANTILLA 'EJS'
// console.log(path.join(__dirname, 'views'))

// Middlewares
app.use(morgan('dev')); /** Datos de la peticion del servidor **/
app.use(
    express.urlencoded({extended: false})
    ); /** ayuda a entender lo que es enviado por los formularios **/

const Storange = multer.diskStorage({
    destination: path.join(__dirname, 'src/public/img/uploads'),
    filename: (req, file, cb, filename)=>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: Storange}).single('img'));

// Variables Globales
app.use((req, res, next)=>{
    app.locals.formatoFecha = format;
    next();
});

// Rutas
app.use(require('./src/routes/index.js'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'src/public')));


// Iniciar el servidor
app.listen(3000, ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});