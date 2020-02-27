const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/Product');

mongoose.connect('mongodb+srv://sven:go-fullstack1552511@cluster0-otu6a.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


// CORS
app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requst_With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','Get, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use(bodyParser.json());


app.post('/api/products',(req,res,next)=>{
    delete req.body._id;
    const product = new Product({
        ...req.body
    });
    product.save()
    .then(()=>res.status(201).json({product}))
    .catch(error => res.status(400).json({error}));
});

app.put('/api/stuff/:id',(req, res, next)=>{
    Product.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({error}));
});

app.delete('/api/stuff/:id',(req, res, next)=>{
    Product.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'objet supprimé'}))
    .catch(error => res.status(400).json({error}));
});


app.get('/api/products/:id',(req, res, next)=>{
    Products.findOne({_id: req.params.id})
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json({error}));
}); 


app.get('/api/prodcts',(req,res,next)=> {
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({error}));
});


module.exports = app;