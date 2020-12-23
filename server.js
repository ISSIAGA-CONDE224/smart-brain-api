const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = { //creation de la base de donnée interne
    users : [
        {
            id : "123",
            name : "conde",
            email : "conde@gmail.com",
            password : "cookies",
            entries : 0,
            joined : new Date()
        },

        {
            id : "124",
            name : "kaba",
            email : "kaba@gmail.com",
            password : "bananas",
            entries : 0,
            joined : new Date()
        },
        {
            id : "125",
            name : "sekou",
            email : "sekou@gmail.com",
            password : "mangue",
            entries : 0,
            joined : new Date()
        }
    ],
    login : [
        {
            id : "987",
            hash : "",
            email : "conde@gmail.com"
        }
    ]
}


app.get('/', (req, res) =>{
    res.send(database.users);
})

//methode de connection et d'enregistrement

app.post('/signing',(req, res) =>{

    bcrypt.compare('avocat','$2a$10$pEMI8rnck3eVwGWeSF0wFOGMf9v.feOYUi9OS6VOd7agkCkrtBim2',function(error,res){
        console.log('mot de passe identique',res);
    })
    bcrypt.compare('veggie','$2a$10$pEMI8rnck3eVwGWeSF0wFOGMf9v.feOYUi9OS6VOd7agkCkrtBim2', function(error,res){
        console.log('Mot de passe non identique',res);
    })
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
      res.json("succes !");
  }else{
      res.status(400).json("erreur de connection")
  }
})

 //methode d'inscription
 app.post('/register', (req,res) =>{

     const {email,password,name} = req.body;

     //cryptage du mot de passe
    //  bcrypt.hash(password, null,null, function(error,hash){
    //       console.log(hash);
    //  })

     database.users.push(
        {
            id : "125",
            name : name,
            email :email,
            password : password,
            entries : 0,
            joined : new Date()
        }
     )
     res.json(database.users[database.users.length - 1]);
 })

 //methode d'affichage d'utilisateur
 app.get('/profile/:id',(req, res) =>{

     const {id} = req.params;
     let found = false;
     database.users.forEach(user =>{
         if(user.id === id){
             found = true;
            return res.json(user)
         }
     })
     if(!found){
        res.status(404).json('Aucun utilisateur correspondant !')
     }
 })

 //methode d'incrémentation de nombre de requête
 app.post('/image', (req, res)=>{

    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++
           return res.json(user.entries)
        }
    })
    if(!found){
       res.status(404).json('Aucun utilisateur correspondant !')
    }
 })

app.listen(3000, () =>{
    console.log("L'application tourne en plein regime sur le port 3000 !");  
})