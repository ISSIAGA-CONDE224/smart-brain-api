const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '94b1c1da6e1c40aba8c704a4ef816f25'
   });

const handleApiCall = (req,res) =>{
     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data =>{
         res.json(data)}).catch(error =>res.status(400).json('Erreur de connection à API !'))}
  
const handleImage = (req, res,db)=>{

    const {id} = req.body;
    db('users').where('id', '=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{res.json(entries[0])})
    .catch(error =>res.status(400).json('erreur de comptage !').then(data =>{
        res.json(data)
    })).catch(error => res.status(400).json('Erreur de connection à API'))
 }
 module.exports = {
     handleImage ,
     handleApiCall 
 }