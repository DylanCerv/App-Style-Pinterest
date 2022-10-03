const { Schema, model } = require('mongoose');

const imgSchema = new Schema({
    titulo: { type: String },
    descripcion: { type: String },
    nombreArchivo: { type: String },
    ruta: { type: String },
    public_id_Cloudinary: { type: String },
    nombreOriginal: { type: String },
    minetype: { type: String },
    peso: { type: Number },
    fechaCracion: { 
        type: Date,
        default: Date.now()
    }
});


module.exports = model('Imagen', imgSchema);