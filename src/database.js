const mogoose = require('mongoose');

mogoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db=>console.log('La base de datos mongoDB esta conectado'))
    .catch(err=>console.log(err))