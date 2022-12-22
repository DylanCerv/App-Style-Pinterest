const { Router } =  require('express');
const router = Router();

const img = require('./../models/img.js')

const path = require('path');
const { unlink } = require('fs-extra');


const cloudinary = require('cloudinary');


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })



router.get('/', async (req, res)=>{
    const imagenes = await img.find();
    console.log(imagenes);
    res.render('index.ejs', { imagenes: imagenes });
    // res.send('pagina inicial');
});

router.get('/upload', (req, res)=>{
    // res.send('Formulario de subida de datos');
    res.render('upload.ejs');
});

router.post('/upload', async (req, res)=>{
    // console.log(req);

    // console.log(resultCloudinary);
    
    if (typeof req.file != 'undefined'){   
        const resultCloudinary = await cloudinary.v2.uploader.upload(req.file.path);

        const image = new img();

        image.titulo = req.body.title;
        image.descripcion = req.body.descripcion;
        image.nombreArchivo = req.file.filename;
        // image.ruta = `/img/uploads/${req.file.filename}`;
        image.ruta = resultCloudinary.secure_url;
        image.public_id_Cloudinary = resultCloudinary.public_id;
        image.nombreOriginal = req.file.originalname;
        image.minetype = req.file.mimetype;
        image.peso = req.file.size;
        

        await image.save();
        
        await unlink(path.resolve(`./src/public/img/uploads/${req.file.filename}`));
        // console.log(image.ruta);
    }

    res.redirect('/');
    // res.send('data subida via post');
});

router.get('/img/:id', async (req,res)=>{
    const imagenP = await img.findById((req.params.id));
    const imagenes = await img.find();


    res.render('perfil.ejs', { imagenP: imagenP, imagenes: imagenes });

    // res.send('Esta es el perfil de la imagen');
});

router.get('/img/:id/delete', async (req, res)=>{
    const { id } = req.params;
    const imgD = await img.findByIdAndDelete(id);
    await cloudinary.v2.uploader.destroy(imgD.public_id_Cloudinary);
    res.redirect('/');
    // res.send('imagen eliminada');
});




module.exports = router;