const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://sven:go-fullstack1552511@cluster0-otu6a.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// midleware
// app.use((req,res,next)=>{
//     console.log('reçu');
//     next();
// })

// app.use((req,res,next)=>{
//     res.status(201);
//     next();
// });

// app.use((req,res,next)=>{
//     res.json({message:'votre requete'});
//     next();
// });

// app.use((req,res)=>{
//    console.log('res avec success');
// });

// CORS
app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requst_With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','Get, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use(bodyParser.json());


app.post('/api/stuff',(req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(()=>res.status(201).json({message: 'Objet enregistré'}))
    .catch(error => res.status(400).json({error}));
});

// get
// app.use('/api/stuff',(req,res,next)=> {
//     const stuff = [{
//         _id: 'ovihrevoer',
//         title: 'mon premier objet',
//         description: 'les infos',
//         imageUrl: '',
//         price: 4900,
//         userid: 'faerververv',
//     },
//     {
//         _id: 'ovihrevoer',
//         title: 'mon premier objet',
//         description: 'les infos',
//         imageUrl: '',
//         price: 4900,
//         userid: 'faerververv',
//     }];
//     res.status(200).json(stuff);
// });

app.put('/api/stuff/:id',(req, res, next)=>{
    Thing.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({error}));
});

app.delete('/api/stuff/:id',(req, res, next)=>{
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'objet supprimé'}))
    .catch(error => res.status(400).json({error}));
});


app.get('/api/stuff/:id',(req, res, next)=>{
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({error}));
}); 


app.get('/api/stuff',(req,res,next)=> {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
});


module.exports = app;